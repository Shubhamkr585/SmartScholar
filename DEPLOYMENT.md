# Deployment Guide for ScholarTrack

## 1. Backend Deployment (Render / Railway)

### Prerequisites
- Push your code to GitHub.
- Get your MongoDB Connection String (Atlas).
- Get your Google Gemini API Key.
- Get your Clerk Secret Key (Backend).

### Steps (Render)
1. Create a new **Web Service**.
2. Connect your GitHub repository.
3. Root Directory: `backend`
4. Build Command: `npm install && npx tsc`
5. Start Command: `node dist/index.js`
6. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `GOOGLE_API_KEY`: Your Gemini API key.
   - `CLERK_SECRET_KEY`: Your Clerk Secret Key.
   - `PORT`: `10000` (Render default).

## 2. Frontend Deployment (Vercel)

### Prerequisites
- Get your Vercel Project ready.
- Get your Clerk Publishable Key.
- **Update API URL**: In `frontend/src/pages/Dashboard.tsx`, `KanbanBoard.tsx`, etc., ensure the axios calls point to your *deployed backend URL* (e.g., `https://scholartrack-backend.onrender.com/api`) instead of `localhost:5000`. You should use an environment variable `VITE_API_URL`.

### Steps (Vercel)
1. Import your GitHub repository.
2. Root Directory: `frontend`
3. Framework Preset: **Vite**
4. **Environment Variables**:
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk Publishable Key.
   - `VITE_API_URL`: Your backend URL.
5. Deploy!

## 3. Final Verification
- Log in on the deployed frontend.
- Check if scholarships load (Backend connection).
- Test the Scraper (might require a dedicated worker instance on Render if it takes long).
