// import { v2 as cloudinary } from 'cloudinary';
// import { response } from 'express';
// import fs from 'fs';
//  cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET 
//     });
//     const uploadImage =  async (localFilePath)=>{
//     //                 if(!localFilePath)return null;

//     //     try{
//     //         const uploadResult = await cloudinary.uploader.upload(
//     //        localFilePath, {
//     //            resource_type:"auto",
//     //        }
//     //    )
//     //       fs.unlinkSync(localFilePath);
//     //     console.log("file is uploaded",response.url);
//     //     return uploadResult;
//     // }
//     //     catch(error){
//     //        if (fs.existsSync(localFilePath)) {
//     //   fs.unlinkSync(localFilePath);
//     // }

//     // return null;
//     //     }
//     // }
//     try {
//     if (!localFilePath) return null;

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     console.log(`file is uploaded on cloudinary: ${response.url}`);
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.log("Error uploading file to Cloudinary:", error);

//     fs.unlinkSync(localFilePath);
//   }
// };
//     export {uploadImage};
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Load .env variables
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(`File uploaded to Cloudinary: ${result.url}`);

    // Remove local file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadImage };
