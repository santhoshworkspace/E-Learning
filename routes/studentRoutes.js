import express, { Router } from 'express';
import {signup,login} from '../controllers/studentsControllers.js'

const studentRoute = express.Router();

studentRoute.post('/signup',signup)
studentRoute.post('/login',login)

export default studentRoute;