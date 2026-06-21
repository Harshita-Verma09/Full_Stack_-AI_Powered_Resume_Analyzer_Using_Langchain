///home/harshita-verma/Documents/JS+LLM/Resume_Analyse/resume-analyzer-be/server.js

import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

// Connect MongoDB then start server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });