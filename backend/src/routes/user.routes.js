import Router from 'express';
import { logoutUser, registerUser } from '../controller/user.controller.js';
import { loginUser } from '../controller/user.controller.js';
import { User } from '../models/user.model.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { uploadImage } from '../utils/cloudinary.js';
const router =Router();
//console.log("in user routes");
router.route('/register').post(registerUser);
router.route('/loginuser').post(loginUser);
router.route('/logoutuser').post(verifyJWT,logoutUser);
//router.post('/upload',verifyJWT,upload.single('file'),uploadFileController);

export  {router};
