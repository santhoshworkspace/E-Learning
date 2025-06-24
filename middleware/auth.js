import jwt from 'jsonwebtoken'

export const auth=async(req,res,next)=>{
    try{
   const token = req.header('Authorization').replace('Bearer','').trim();
   const decode = jwt.verify(token,process.env.JWT)
   console.log(decode)
   req.user=decode
   console.log(req.user)
   next()
}
   catch{
    console.log("Unauthorization")
    res.status(401).json({message:"Unauthorization"})
   }
}