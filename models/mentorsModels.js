import mongoose  from "mongoose";

const MentorSchema = new mongoose.Schema({
    First_name:String,
    Last_name:String,
    email:String,
    Area_experience:String,
    password:String
})

export default mongoose.model("Mentor",MentorSchema)