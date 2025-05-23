import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  First_name: String,
  Last_name: String,
  email: String,
  password: String,
});

export default mongoose.model('Student', studentSchema);