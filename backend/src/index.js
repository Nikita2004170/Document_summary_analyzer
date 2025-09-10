import mongoose from 'mongoose';
import { DB_NAME } from './constant.js';
import dotenv from 'dotenv';
import app from './app.js';
import path from 'path';
dotenv.config({
    path: './.env'
});

const connectDB = async () => {
    //console.log(process.env.MONGO_URI,"xyz")
    try {
        const connectioninst = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`mongodb connected`);
    } catch (error) {
        console.log(`connection failed`);
    }
}
connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000,()=>{ //callback function
    console.log(`server is running at port: ${process.env.PORT}`);
   }) 
})
.catch((error)=>{
    console.log("Error in loading database ",error);
}
)

export default connectDB;