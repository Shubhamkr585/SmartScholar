import mongoose from 'mongoose';
import Scholarship from './models/Scholarship';
import dotenv from 'dotenv';

dotenv.config();

const sampleScholarships = [
    {
        title: "National Merit Scholarship",
        provider: "NMSC",
        amount: 100000,
        deadline: new Date("2025-12-31"),
        criteria: {
            minGPA: 8.5,
            maxIncome: 800000,
            allowedCourses: ["B.Tech", "B.E"],
            allowedCategories: ["General", "OBC", "SC", "ST"]
        },
        isActive: true,
        applyLink: "https://example.com/apply1"
    },
    {
        title: "Women in Tech Grant",
        provider: "TechFoundation",
        amount: 50000,
        deadline: new Date("2026-03-15"),
        criteria: {
            minGPA: 7.0,
            maxIncome: 1200000,
            allowedCourses: ["Computer Science", "IT"],
            allowedCategories: ["General", "OBC", "SC", "ST", "Minority"]
        },
        isActive: true,
        applyLink: "https://example.com/apply2"
    },
    {
        title: "Need-Based Financial Aid",
        provider: "Govt of India",
        amount: 25000,
        deadline: new Date("2025-10-20"),
        criteria: {
            minGPA: 6.0,
            maxIncome: 250000,
            allowedCourses: [], // All courses
            allowedCategories: ["SC", "ST"]
        },
        isActive: true,
        applyLink: "https://example.com/apply3"
    },
    {
        title: "Google Generation Scholarship",
        provider: "Google",
        amount: 200000,
        deadline: new Date("2025-12-10"),
        criteria: {
            minGPA: 7.0,
            maxIncome: 99999999, // No limit
            allowedCourses: ["Computer Science"],
            allowedCategories: ["General", "OBC", "SC", "ST"]
        },
        isActive: true,
        applyLink: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track');
        console.log("Connected to DB");

        // Clear existing
        await Scholarship.deleteMany({});
        console.log("Cleared existing scholarships");

        // Insert new
        await Scholarship.insertMany(sampleScholarships);
        console.log("Seeded sample scholarships");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
