import { uploadImage } from "../utils/cloudinary.js";
import { File } from "../models/file.model.js";
import { extractText } from "../utils/extractText.js";
import { generateSummaryHuggingFace } from "../utils/generateSummary.js";
import mongoose from "mongoose";
export const uploadFileController = async (req, res) => {
 // console.log("In upload file controller", req.file, req.user);
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const user = req.user;
console.log(req.file);
const extractedText = await extractText(req.file.path, req.file.mimetype);

    const result = await uploadImage(req.file.path);
        console.log("Cloudinary upload result:", result);

    if (!result) {
      return res.status(500).json({ success: false, message: "Upload failed" });
    }
    const file = await File.create({
      fileurl: result.url,
      owner: user._id,
      fileType: req.file.mimetype,
      extractedText,
    });
    if (!file) {
      return res.status(500).json({ success: false, message: "file creation failed" });
    }
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getUserFiles = async (req, res) => {
  console.log("Fetching files for user:", req.user);
  try {
    const userId = req.user._id;

    const files = await File.find({ owner: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User files fetched successfully",
      files,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch files",
      error: error.message,
    });
  }
};
export const fileSummary = async (req, res) => {
  const { fileId } = req.params;
  const { length = 'medium' } = req.query;
  
  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid file id" 
    });
  }
  const file = await File.findById(fileId);
  if (!file) {
          return res.status(404).json({ 
            success: false,
             message: "file not found" });

  }
  if (file.owner.toString() !== req.user._id.toString()) {
          return res.status(403).json({ 
            success: false, 
            message: "You are not authorized to access this file" });
  }
  console.log("Extracted text length:", file.extractedText?.length);
  
  try {
    const summary = await generateSummaryHuggingFace(file.extractedText, length);
    if (!summary) {
      return res.status(400).json({ 
        success: false, 
        message: "Failed to generate summary" 
      });
    }
    
    file.summary = summary;
    await file.save();
    
    return res.status(200).json({
      success: true,
      message: "File summary generated successfully!",
      summary,
    });
  } catch (error) {
    console.error("Summary generation error:", error);
    return res.status(500).json({
      success: false,
      message: "Error generating summary: " + error.message
    });
  }
  
};