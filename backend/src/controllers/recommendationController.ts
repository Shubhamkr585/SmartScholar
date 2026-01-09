import { Request, Response } from 'express';
import Scholarship from '../models/Scholarship';
import User, { IUser } from '../models/User';

export const getRecommendations = async (req: Request, res: Response) => {
    try {
        // In a real app with Clerk, we'd get the userId from req.auth.userId
        // For now, we'll assume the userId is passed in the query or body for testing
        // or we fetch the user based on the Clerk ID if synced.
        // Let's assume we receive a clerkId headers or similar.
        // For prototype simplicity, let's accept a query param ?email=... or just use body params for matching directly if no user in DB yet.

        // Better approach for Phase 3: Receive profile data in body for "Instant Match" or fetch user from DB.
        // Let's support "Instant Match" which is used during onboarding/dashboard.

        let profile = req.body.profile;

        // If profile not provided, try to find user (if we had auth middleware set up fully)
        // const { userId } = req.auth; 

        if (!profile) {
            return res.status(400).json({ message: "User profile data required for recommendations" });
        }

        // Matching Logic
        // 1. Fetch active scholarships
        const allScholarships = await Scholarship.find({ isActive: true });

        // 2. Filter
        // profile: { cgpa: number, familyIncome: number, course: string, category: string }
        const matches = allScholarships.filter(scholarship => {
            // GPA/Percentage Check
            // Convert CGPA to Percentage if needed (Approx * 9.5)
            const userScore = (profile.cgpa || 0) <= 10 ? (profile.cgpa || 0) * 9.5 : (profile.cgpa || 0);
            const scorePass = userScore >= (scholarship.criteria.minPercentage || 0);

            // Income Check
            const incomePass = (profile.familyIncome || 0) <= (scholarship.criteria.maxFamilyIncome || 99999999);

            // Course Check
            // If allowedCourses is empty, it might mean "All".
            const coursePass = scholarship.criteria.allowedCourses.length === 0 ||
                scholarship.criteria.allowedCourses.some(c => c.toLowerCase().includes(profile.course.toLowerCase()));

            // Category Check
            const categoryPass = scholarship.criteria.allowedCategories.length === 0 ||
                scholarship.criteria.allowedCategories.includes(profile.category);

            return scorePass && incomePass && coursePass; // && categoryPass (category often varies)
        });

        res.json(matches);

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
