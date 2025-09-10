import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
      type:String,
      required:true,
      lowercase:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    refreshToken: { 
      type: String 
    } 
}, 
{ timestamps: true }
);
//hooks
userSchema.pre("save",async function (next) {
  if(!this.isModified("password"))return next();
  this.password= await bcrypt.hash(this.password,10);
  next(); 
})
//method
userSchema.methods.isPasswordCorrect = async function (password) {
  //console.log("comparing passwords", password, this.password);

  try {
    console.log("comparing passwords", password, this.password);
    const result = await bcrypt.compare(password, this.password);
    
    console.log("password comparison result", result);
    return result;
  } catch (err) {
    console.error("bcrypt.compare failed:", err);
    return false;
  }
};

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       name: this.name,
//     },
//     process.env.ACCESS_TOKEN, 
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       name: this.name,
//     },
//     process.env.REFRESH_TOKEN, 
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACEESS_TOKEN_EXPIRY }
  );
};

// Instance method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
export const User = mongoose.model('user', userSchema);