 import {User} from '../models/user.model.js';
 import jwt from 'jsonwebtoken';
 export const verifyJWT= async (req,res,next)=>{
try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token )
        {
            return res.status(401).json({
                status:false,
                message:"Unauthorized request"
            })
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN);
         console.log(decodedToken);
        const user = await User.findById(decodedToken?.userId).select("-password -refreshToken")
   
    
        if (!user) {
          return res.status(401).json({
                status:false,
                message:"Invalid Access Token"
            })  
            
        }
    
        req.user = user;
        next()
}
catch(err){
    return res.status(401).json({
        status:false,
        message:"invalid token"
    });
}
 }