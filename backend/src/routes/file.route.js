import { uploadFileController } from '../controller/file.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { getUserFiles } from '../controller/file.controller.js';
import { fileSummary } from '../controller/file.controller.js';
import Router from 'express';
const router = Router();    
router.post('/upload', verifyJWT, upload.single('file'), uploadFileController);

router.get("/files", verifyJWT, getUserFiles);
//router.route("/summary/:fileId").get(fileSummary);
router.route("/summary/:fileId").get(verifyJWT, fileSummary);
export { router };