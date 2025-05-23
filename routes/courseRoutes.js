import express from 'express';
import upload from '../middleware/multer.js';
import { postCourse, getCourses } from '../controllers/courseControllers.js';

const router = express.Router();

router.post('/upload', upload.single('video'), postCourse);
router.get('/', getCourses);

export default router;
