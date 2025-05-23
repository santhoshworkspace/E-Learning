import express from 'express';
import { signup,login } from '../controllers/mentorsControllers.js';

const mentorRoutes = express.Router();

mentorRoutes.post('/signup',signup);
mentorRoutes.post('/login',login);

export default mentorRoutes;