import { Request, Response } from 'express';
import ApplicationTracker, { AppStatus } from '../models/ApplicationTracker';

// Get all applications for a user
export const getApplications = async (req: Request, res: Response) => {
    try {
        // Assuming userId is passed in body for prototype or header (Clerk ID)
        // Ideally use req.auth.userId from Clerk middleware
        const { userId } = req.body;

        if (!userId) {
            // Fallback for demo if no auth middleware yet
            return res.status(400).json({ message: "User ID required" });
        }

        const applications = await ApplicationTracker.find({ userId }).populate('scholarshipId');
        res.json(applications);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new application (Save/Apply)
export const addApplication = async (req: Request, res: Response) => {
    try {
        const { userId, scholarshipId, status, notes } = req.body;

        const newApp = new ApplicationTracker({
            userId,
            scholarshipId,
            status: status || AppStatus.SAVED,
            personalNotes: notes
        });

        const savedApp = await newApp.save();
        res.status(201).json(savedApp);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// Update status (Drag and Drop)
export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!Object.values(AppStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedApp = await ApplicationTracker.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedApp) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(updatedApp);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete application
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ApplicationTracker.findByIdAndDelete(id);
        res.json({ message: "Application removed" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
