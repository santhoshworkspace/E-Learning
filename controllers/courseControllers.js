
import Course from '../models/courseModels.js';
import { getGFS } from '../config/db.js';
import { Readable } from 'stream';

export const postCourse = async (req, res) => {
  try {
    const { title, description, mentorId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const gfs = getGFS();
    const filename = `${Date.now()}-${file.originalname}`;

    const readableStream = Readable.from(file.buffer);
    const uploadStream = gfs.openUploadStream(filename, {
      contentType: file.mimetype,
      metadata: { mentorId, originalName: file.originalname }
    });

    readableStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Video upload failed', details: err.message });
    });

    uploadStream.on('finish', async () => {
      const course = new Course({
        title,
        description,
        mentor: mentorId.trim(),
        videoFilename: filename,
      });

      await course.save();
      res.status(201).json(course);
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('mentor', 'First_name Last_name');
    const host = req.headers.host;

    const enhancedCourses = courses.map(course => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      videoUrl: `http://${host}/course/video/${course.videoFilename}`
    }));

    res.json(enhancedCourses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
};
