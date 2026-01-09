import mongoose from 'mongoose';
import Scholarship from './models/Scholarship';
import dotenv from 'dotenv';
dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track');
    const count = await Scholarship.countDocuments({});
    console.log(`Total Scholarships: ${count}`);
    const last = await Scholarship.findOne().sort({ lastScrapedAt: -1 });
    if (last) console.log("Recent:", JSON.stringify(last, null, 2));
    process.exit(0);
}
check();
