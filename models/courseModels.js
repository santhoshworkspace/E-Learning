import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoFilename: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

export default mongoose.model('Course', CourseSchema);
