import express from 'express';
import scholarshipRoutes from './scholarships';
import recommendationRoutes from './recommendations';
import trackerRoutes from './tracker';

const router = express.Router();

router.use('/scholarships', scholarshipRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/tracker', trackerRoutes);

export default router;
