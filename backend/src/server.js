import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js';
import cors from 'cors';
import path from "path";
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();
connectDB();

const app = express();

// parse JSON
app.use(express.json());

// ✅ CORS
app.use(cors());

// ✅ serve images
app.use('/uploads', express.static('uploads'));

// ✅ routes
app.use('/cars', carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));