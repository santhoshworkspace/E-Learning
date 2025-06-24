import express from 'express';
import upload from '../middleware/multer.js';
import { postCourse, getCourses,buyCourse  } from '../controllers/courseControllers.js';
import { getGFS } from '../config/db.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// 🔹 Upload a course with video
router.post('/upload',auth, upload.single('video'), postCourse);

// 🔹 Get all courses (with video URLs)
router.get('/',auth, getCourses);

// 🔹 Stream a video by filename from GridFS
router.get('/video/:filename',auth, async (req, res) => {
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


router.post('/buy', auth, buyCourse);

export default router;
