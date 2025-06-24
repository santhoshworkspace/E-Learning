import express from 'express';
import dotenv from 'dotenv';
import studentRoute from './routes/studentRoutes.js'
import mentorRoutes from './routes/mentorRoutes.js';
import { connectDB } from './config/db.js';
import courseroute from './routes/courseRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
// Connect to DB
connectDB();

app.use(express.json());
app.use('/Student', studentRoute);
app.use('/Mentor',mentorRoutes);
app.use('/course',courseroute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
