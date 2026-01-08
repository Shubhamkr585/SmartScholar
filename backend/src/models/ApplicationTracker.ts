import mongoose, { Schema, Document, Types } from 'mongoose';

export enum AppStatus {
    SAVED = 'SAVED',
    APPLIED = 'APPLIED',
    INTERVIEW = 'INTERVIEW',
    REJECTED = 'REJECTED',
    AWARDED = 'AWARDED'
}

export interface IApplicationTracker extends Document {
    userId: Types.ObjectId;
    scholarshipId: Types.ObjectId;
    status: AppStatus;
    personalNotes?: string;
    reminderDate?: Date;
}

const ApplicationTrackerSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scholarshipId: { type: Schema.Types.ObjectId, ref: 'Scholarship', required: true },
    status: { type: String, enum: Object.values(AppStatus), default: AppStatus.SAVED },
    personalNotes: { type: String },
    reminderDate: { type: Date }
});

export default mongoose.model<IApplicationTracker>('ApplicationTracker', ApplicationTrackerSchema);
