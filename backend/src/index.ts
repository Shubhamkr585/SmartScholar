import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import routes from './routes';
import startCronJobs from './cron';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  (process.env.CLIENT_URL || '').replace(/\/$/, "") // Remove trailing slash if present
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or cron jobs)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || !process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      console.log(`[CORS Blocked] Origin: ${origin}, Allowed: ${allowedOrigins}`); // Debug Log
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Start Cron Jobs
startCronJobs();

// API Routes
app.use('/api', routes);

// Basic Health Check
app.get('/', (req, res) => {
  res.send('ScholarTrack API is running');
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
