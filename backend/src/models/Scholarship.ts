import { Schema, model, Document } from 'mongoose';

export interface IScholarship extends Document {
    title: string;
    provider: string;
    description?: string;

    amount: {
        value: number;
        formatted: string;
    };

    deadline: Date;
    applyLink: string;
    coverImage?: string;

    // The Logic Layer
    criteria: {
        minPercentage: number;
        maxFamilyIncome: number;
        educationLevel: string[];
        allowedCourses: string[];
        allowedCategories: string[];
        allowedGender: 'Male' | 'Female' | 'All';
    };

    location: {
        country: string;
        state: string;
        city?: string;
    };

    isActive: boolean;
    isScraped: boolean;
    sourceUrl?: string;
    lastScrapedAt: Date;
}

const scholarshipSchema = new Schema<IScholarship>(
    {
        title: { type: String, required: true, trim: true },
        provider: { type: String, required: true },
        description: { type: String },

        amount: {
            value: { type: Number, default: 0 },
            formatted: { type: String, required: true }
        },

        deadline: { type: Date, required: true },
        applyLink: { type: String, required: true },
        coverImage: { type: String },

        // The Logic Layer
        criteria: {
            minPercentage: { type: Number, default: 0 },
            maxFamilyIncome: { type: Number, default: 99999999 }, // High default for "No Limit"

            // We use [String] to allow multiple values
            educationLevel: {
                type: [String],
                required: true,
                // Removed enum validation to allow for flexibility during scraping/seeding, but logically should follow conventions
            },
            allowedCourses: { type: [String], default: ['All'] },
            allowedCategories: {
                type: [String],
                default: ['All']
            },
            allowedGender: {
                type: String,
                enum: ['Male', 'Female', 'All'],
                default: 'All'
            }
        },

        location: {
            country: { type: String, default: 'India' },
            state: { type: String, default: 'All' },
            city: { type: String }
        },

        isActive: { type: Boolean, default: true },
        isScraped: { type: Boolean, default: true },
        sourceUrl: { type: String },
        lastScrapedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

// --- Indexes for High Performance Filtering ---
scholarshipSchema.index({ 'criteria.educationLevel': 1 });
scholarshipSchema.index({ 'criteria.allowedCategories': 1 });
scholarshipSchema.index({ 'location.country': 1 });
scholarshipSchema.index({ deadline: 1 });

export default model<IScholarship>('Scholarship', scholarshipSchema);
