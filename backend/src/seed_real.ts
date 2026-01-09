import mongoose from 'mongoose';
import Scholarship from './models/Scholarship';
import dotenv from 'dotenv';

dotenv.config();

const realScholarships = [
    {
        title: "HDFC Bank Parivartan's ECSS Programme 2025",
        provider: "HDFC Bank",
        amount: 75000,
        deadline: new Date("2025-03-31"),
        applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan/educational-crisis-scholarship-support",
        criteria: {
            minGPA: 0,
            maxIncome: 250000,
            allowedCourses: ["Undergraduate", "Postgraduate", "Diploma"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India"],
            educationLevel: ["Undergraduate", "Postgraduate"]
        }
    },
    {
        title: "Reliance Foundation Undergraduate Scholarships 2025",
        provider: "Reliance Foundation",
        amount: 200000,
        deadline: new Date("2025-02-14"),
        applyLink: "https://www.reliancefoundation.org",
        criteria: {
            minGPA: 7.5, // 75%
            maxIncome: 1500000,
            allowedCourses: ["Engineering", "Medicine", "Commerce", "Arts", "Science"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India"],
            educationLevel: ["Undergraduate"]
        }
    },
    {
        title: "Tata Capital Pankh Scholarship Programme",
        provider: "Tata Capital",
        amount: 50000,
        deadline: new Date("2025-03-10"),
        applyLink: "https://www.tatacapital.com",
        criteria: {
            minGPA: 6.0,
            maxIncome: 400000,
            allowedCourses: ["Undergraduate", "Diploma", "Polytechnic"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India"],
            educationLevel: ["Undergraduate", "School"]
        }
    },
    {
        title: "LIC HFL Vidyadhan Scholarship 2024",
        provider: "LIC Housing Finance Limited",
        amount: 20000,
        deadline: new Date("2024-12-31"), // Keeping somewhat recent
        applyLink: "https://www.lichousing.com",
        criteria: {
            minGPA: 6.5,
            maxIncome: 360000,
            allowedCourses: ["Class 11", "Class 12", "Undergraduate"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India"],
            educationLevel: ["School", "Undergraduate"]
        }
    },
    {
        title: "Keep India Smiling Foundational Scholarship",
        provider: "Colgate",
        amount: 30000,
        deadline: new Date("2025-04-30"),
        applyLink: "https://www.colgate.com",
        criteria: {
            minGPA: 6.0,
            maxIncome: 500000,
            allowedCourses: ["Class 11", "Graduation", "Engineering"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India"],
            educationLevel: ["School", "Undergraduate"]
        }
    },
    {
        title: "JSW Udaan Scholarship",
        provider: "JSW Foundation",
        amount: 50000,
        deadline: new Date("2025-02-28"),
        applyLink: "https://www.jsw.in/foundation",
        criteria: {
            minGPA: 5.0,
            maxIncome: 800000,
            allowedCourses: ["Undergraduate", "Postgraduate"],
            allowedCategories: ["General", "OBC", "SC", "ST"],
            location: ["India", "Maharashtra", "Karnataka", "Tamil Nadu"],
            educationLevel: ["Undergraduate", "Postgraduate"]
        }
    },
    {
        title: "Oak North STEM Scholarship",
        provider: "Oak North",
        amount: 30000,
        deadline: new Date("2025-01-31"),
        applyLink: "https://www.oaknorth.com",
        criteria: {
            minGPA: 8.0,
            maxIncome: 600000,
            allowedCourses: ["STEM"],
            allowedCategories: ["Female"],
            location: ["Haryana", "Uttarakhand"],
            educationLevel: ["Undergraduate"]
        }
    },
    {
        title: "Rolls-Royce Unnati Scholarship",
        provider: "Rolls-Royce India",
        amount: 35000,
        deadline: new Date("2025-03-31"),
        applyLink: "https://www.rolls-royce.com",
        criteria: {
            minGPA: 6.0,
            maxIncome: 400000,
            allowedCourses: ["Engineering"],
            allowedCategories: ["Female"],
            location: ["India"],
            educationLevel: ["Undergraduate"]
        }
    },
    {
        title: "Kotak Kanya Scholarship 2024",
        provider: "Kotak Education Foundation",
        amount: 150000, // Per year
        deadline: new Date("2024-12-30"),
        applyLink: "https://kotakeducation.org",
        criteria: {
            minGPA: 7.5, // 85% in 12th
            maxIncome: 600000,
            allowedCourses: ["Professional Courses", "MBBS", "Engineering", "LLB", "Architecture"],
            allowedCategories: ["Female"],
            location: ["India"],
            educationLevel: ["Undergraduate"]
        }
    },
    {
        title: "Viral Rupani Foundation Scholarship",
        provider: "Viral Rupani Foundation",
        amount: 10000,
        deadline: new Date("2025-06-30"),
        applyLink: "https://vrfoundation.org",
        criteria: {
            minGPA: 0,
            maxIncome: 99999999,
            allowedCourses: ["All"],
            allowedCategories: ["General"],
            location: ["Mumbai", "Maharashtra"],
            educationLevel: ["School"]
        }
    },
    {
        title: "British Council Women in STEM",
        provider: "British Council",
        amount: 2500000, // Full funding
        deadline: new Date("2025-03-31"),
        applyLink: "https://www.britishcouncil.org",
        criteria: {
            minGPA: 0,
            maxIncome: 99999999,
            allowedCourses: ["MSc", "PhD"],
            allowedCategories: ["Female"],
            location: ["International", "UK"],
            educationLevel: ["Postgraduate", "PhD"]
        }
    },
    {
        title: "Fulbright-Nehru Master's Fellowships",
        provider: "USIEF",
        amount: 3000000,
        deadline: new Date("2025-05-15"),
        applyLink: "https://www.usief.org.in",
        criteria: {
            minGPA: 0,
            maxIncome: 99999999,
            allowedCourses: ["Master's"],
            allowedCategories: ["General"],
            location: ["International", "USA"],
            educationLevel: ["Postgraduate"]
        }
    },
    {
        title: "Inlaks Shivdasani Scholarships",
        provider: "Inlaks Foundation",
        amount: 7500000, // up to 100k USD
        deadline: new Date("2025-03-31"),
        applyLink: "https://www.inlaksfoundation.org",
        criteria: {
            minGPA: 7.0,
            maxIncome: 99999999,
            allowedCourses: ["Postgraduate"],
            allowedCategories: ["General"],
            location: ["International", "USA", "UK", "Europe"],
            educationLevel: ["Postgraduate"]
        }
    },
    {
        title: "Kindle Application Scholarship",
        provider: "Kindle Foundation",
        amount: 6000,
        deadline: new Date("2025-01-20"),
        applyLink: "https://kindle.com",
        criteria: {
            minGPA: 0,
            maxIncome: 500000,
            allowedCourses: ["School"],
            allowedCategories: ["General"],
            location: ["India"],
            educationLevel: ["School"]
        }
    },
    {
        title: "Santoor Women's Scholarship",
        provider: "Wipro Consumer Care",
        amount: 24000,
        deadline: new Date("2025-02-15"),
        applyLink: "https://www.santoorwomen.scholarship.com",
        criteria: {
            minGPA: 0, // Passed 12th
            maxIncome: 99999999,
            allowedCourses: ["Undergraduate", "Humanities", "Liberal Arts", "Sciences"],
            allowedCategories: ["Female"],
            location: ["Andhra Pradesh", "Karnataka", "Telangana", "Chhattisgarh"],
            educationLevel: ["Undergraduate"]
        }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track');
        console.log('MongoDB Connected for Seed');

        // Upsert simple to keep existing if scraped
        for (const s of realScholarships) {
            await Scholarship.findOneAndUpdate(
                { title: s.title },
                { ...s, isActive: true, lastScrapedAt: new Date() },
                { upsert: true }
            );
            console.log(`Seeded: ${s.title}`);
        }
        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();
