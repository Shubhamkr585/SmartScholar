import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarship extends Document {
    title: string;
    provider: string;
    amount: number;
    deadline: Date;
    applyLink: string;
    isActive: boolean;
    lastScrapedAt: Date;
    criteria: {
        minGPA: number;
        maxIncome: number;
        allowedCourses: string[];
        allowedCategories: string[];
    };
}

const ScholarshipSchema: Schema = new Schema({
    title: { type: String, required: true },
    provider: { type: String, required: true },
    amount: { type: Number },
    deadline: { type: Date },
    applyLink: { type: String },
    isActive: { type: Boolean, default: true },
    lastScrapedAt: { type: Date, default: Date.now },
    criteria: {
        minGPA: { type: Number, index: true },
        maxIncome: { type: Number, index: true },
        allowedCourses: [String],
        allowedCategories: [String]
    }
});

// Indexes for matching engine
ScholarshipSchema.index({ 'criteria.minGPA': 1 });
ScholarshipSchema.index({ 'criteria.maxIncome': 1 });

export default mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
