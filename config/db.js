// config/db.js
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

let gfs;

export const connectDB = async () => {
  const conn = await mongoose.connect('mongodb://localhost:27017/mentorship');
  gfs = new GridFSBucket(conn.connection.db, {
    bucketName: 'videos'
  });
  console.log("mongoDB connected")
};

export const getGFS = () => gfs;
