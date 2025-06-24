import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoFilename: String,
  price: Number,
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: false 
  },
  purchasedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students'
  }]
});


export default mongoose.model('Course', CourseSchema);
