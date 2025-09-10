import cookieParser from 'cookie-parser';
import express from 'express';
import {router as userRouter} from './routes/user.routes.js';
import {router as fileRouter} from './routes/file.route.js';
import cors from 'cors';
const app = express();
//configure all 
// app.use(cors({
//     origin: 'http://localhost:3000/',
   
//     credentials: true
// }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"));
app.use(cookieParser());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/file',fileRouter );

export default app;