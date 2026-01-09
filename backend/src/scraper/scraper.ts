import { Builder, By, until } from 'selenium-webdriver';
import mongoose from 'mongoose';
import Scholarship from '../models/Scholarship';
import dotenv from 'dotenv';
import chrome from 'selenium-webdriver/chrome';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Connect to DB
const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track');
        console.log('MongoDB Connected for Scraper');
    }
};


interface ScrapedScholarship {
    title: string;
    provider: string;
    description: string;
    amount: {
        value: number;
        formatted: string;
    };
    deadline: string | null;
    applyLink: string;
    criteria: {
        minPercentage: number;
        maxFamilyIncome: number;
        educationLevel: string[];
        allowedCourses: string[];
        allowedCategories: string[];
        allowedGender: "All" | "Male" | "Female";
    };
    location: {
        country: string;
        state: string;
    };
}

const runScraper = async () => {
    await connectDB();

    console.log("Initializing Gemini...");
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let options = new chrome.Options();
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--headless');
    options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log('Starting real scraper...');

        // Target specific listing page
        const targetUrl = 'https://www.buddy4study.com/scholarships';
        console.log(`Navigating to ${targetUrl}...`);

        await driver.get(targetUrl);
        await driver.sleep(5000);

        // Extract text
        const bodyText = await driver.findElement(By.tagName('body')).getText();
        const cleanText = bodyText.replace(/\s+/g, ' ').slice(0, 25000);

        console.log(`Got page content (length ${cleanText.length}), parsing with Gemini...`);

        const prompt = `
        Extract scholarship information from the following text (scraped from Buddy4Study/Scholarships).
        Return a JSON array where each object has these fields:
        - title (string)
        - provider (string)
        - description (string, brief summary)
        - amount: { value: number (numeric INR), formatted: string (e.g. "₹ 20,000/year") }
        - deadline (ISO date string YYYY-MM-DD or null)
        - applyLink (string, default to "${targetUrl}")
        - criteria: {
            minPercentage (number 0-100, default 0),
            maxFamilyIncome (number annual INR, default 99999999),
            educationLevel (string array e.g. "Class 11", "Undergraduate"),
            allowedCourses (string array or ["All"]),
            allowedCategories (string array e.g. "General", "SC", "ST", "OBC", "All"),
            allowedGender (string enum: "All", "Male", "Female")
          }
        - location: {
            country (string, default "India"),
            state (string, default "All")
          }

        Text:
        ${cleanText}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse JSON
        let scholarships: ScrapedScholarship[] = [];
        try {
            scholarships = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON from AI", text);
            // Try to find array bracket
            const start = text.indexOf('[');
            const end = text.lastIndexOf(']');
            if (start !== -1 && end !== -1) {
                try {
                    scholarships = JSON.parse(text.substring(start, end + 1));
                } catch (e2) {
                    console.error("Secondary parse failed");
                }
            }
        }

        console.log(`Extracted ${scholarships.length} scholarships.`);

        // Assuming 'scholarships' now contains the parsed data from Gemini,
        // and we need to transform it into the Scholarship model format.
        // The 'rawData' and 'url' variables are not defined in the original context,
        // so this part of the change is likely intended to replace the existing
        // loop with a new processing logic that uses a different input structure.
        // For the purpose of this edit, I will assume 'scholarships' array
        // elements are the 'rawData' that needs to be transformed.
        // The 'url' variable is also not defined, so I'll use targetUrl.

        for (const data of scholarships) {
            if (!data.title) continue;

            // Map to Mongoose Schema
            const scholarshipData = {
                title: data.title,
                provider: data.provider || 'Buddy4Study',
                description: data.description || '',
                amount: {
                    value: data.amount?.value || 0,
                    formatted: data.amount?.formatted || 'Variable'
                },
                deadline: data.deadline ? new Date(data.deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                applyLink: data.applyLink || targetUrl,
                isActive: true,
                isScraped: true,
                lastScrapedAt: new Date(),
                sourceUrl: data.applyLink || targetUrl,

                criteria: {
                    minPercentage: data.criteria?.minPercentage || 0,
                    maxFamilyIncome: data.criteria?.maxFamilyIncome || 99999999,
                    educationLevel: data.criteria?.educationLevel || ['All'],
                    allowedCourses: data.criteria?.allowedCourses || ['All'],
                    allowedCategories: data.criteria?.allowedCategories || ['All'],
                    allowedGender: data.criteria?.allowedGender || 'All'
                },

                location: {
                    country: data.location?.country || 'India',
                    state: data.location?.state || 'All',
                    city: ''
                }
            };

            await Scholarship.findOneAndUpdate(
                { title: scholarshipData.title },
                scholarshipData,
                { upsert: true, new: true }
            );
            console.log(`Saved: ${scholarshipData.title}`);
        }

    } catch (error) {
        console.error('Scraping interaction failed:', error);
    } finally {
        await driver.quit();
        // Do NOT process.exit(0) here, or it kills the server when running via Cron
    }
};

// Only run if called directly
if (require.main === module) {
    runScraper().then(() => process.exit(0));
}

export default runScraper;
