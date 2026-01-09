import express from 'express';
import { getApplications, addApplication, updateApplicationStatus, deleteApplication } from '../controllers/trackerController';

const router = express.Router();

router.post('/', getApplications); // Using POST to send userId easily for demo
router.post('/add', addApplication);
router.put('/:id', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
