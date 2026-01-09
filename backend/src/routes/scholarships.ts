import express, { Request, Response } from 'express';
import Scholarship from '../models/Scholarship';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { country, classLvl, category, gender, state } = req.query;
        let query: any = { isActive: true };

        // 1. Country Filter (location.country)
        if (country) {
            // Case insensitive match for country
            query['location.country'] = { $regex: country, $options: 'i' };
        }

        // 2. State Filter (location.state)
        // If state is selected, we match that State OR 'All' (pan-India scholarships)
        if (state) {
            query['$or'] = [
                { 'location.state': { $regex: state, $options: 'i' } },
                { 'location.state': 'All' }
            ];
        }

        // 3. Education/Class Filter (criteria.educationLevel)
        if (classLvl) {
            // Using $in to check if the filter value exists in the educationLevel array
            // e.g., if user selects "Class 10", we find docs where educationLevel contains "Class 10"
            query['criteria.educationLevel'] = { $in: [classLvl] };
        }

        // 4. Category Filter (criteria.allowedCategories)
        if (category) {
            query['criteria.allowedCategories'] = { $in: [category, 'All', 'General'] };
        }

        // 5. Gender Filter (criteria.allowedGender)
        if (gender) {
            // Matches specific gender OR 'All'
            query['criteria.allowedGender'] = { $in: [gender, 'All'] };
        }

        const scholarships = await Scholarship.find(query).sort({ deadline: 1 }); // Sorted by deadline (closing soon)
        res.json(scholarships);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Manual create (admin usage mainly)
router.post('/', async (req: Request, res: Response) => {
    try {
        const scholarship = new Scholarship(req.body);
        const newScholarship = await scholarship.save();
        res.status(201).json(newScholarship);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
