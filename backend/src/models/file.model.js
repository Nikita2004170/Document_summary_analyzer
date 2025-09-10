import mongoose from "mongoose";
const fileSchema=new mongoose.Schema({
   fileurl:{
    type:String,
    required:true,

   },
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
    fileType: {
    type: String,
   enum: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
    required: true
  },
  extractedText:{
    type:String,
},
summary:{
    type:String,
},  
},
{
    timestamps:true,
});
export const File=mongoose.model("File",fileSchema);
