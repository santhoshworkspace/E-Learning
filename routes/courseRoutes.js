import express from 'express';
import upload from '../middleware/multer.js';
import { postCourse, getCourses } from '../controllers/courseControllers.js';
import { getGFS } from '../config/db.js';

const router = express.Router();

// 🔹 Upload a course with video
router.post('/upload', upload.single('video'), postCourse);

// 🔹 Get all courses (with video URLs)
router.get('/', getCourses);

// 🔹 Stream a video by filename from GridFS
router.get('/video/:filename', async (req, res) => {
  try {
    const gfs = getGFS();
    const file = await gfs.find({ filename: req.params.filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    res.set('Content-Type', file[0].contentType);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Could not stream video', details: err.message });
  }
});

export default router;
