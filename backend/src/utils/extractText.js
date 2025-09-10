import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

export async function extractText(filePath, fileType) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  if (fileType === "application/pdf") {
    const dataBuffer = fs.readFileSync(absolutePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
    const result = await Tesseract.recognize(absolutePath, "eng");
    return result.data.text;
  }

  throw new Error(`Unsupported file type: ${fileType}`);
}