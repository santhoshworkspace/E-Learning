import Student from '../models/studentModels.js';
import jwt from 'jsonwebtoken'
export const signup = async(req,res)=>{
    const student = new Student(req.body);
    await student.save();
    const token = jwt.sign({userId:student._id},process.env.JWT,{expiresIn:'1h'})
    res.status(200).json(`signup completed ${token}`)
};

export const login = async(req,res)=>{
    const student = await Student.findOne({email:req.body.email})
    if(!student || student.password !=req.body.password){
        console.log("Invalid credentials");
        return res.status(401).send('Invalid credentials');
    }
    res.json(student);
}