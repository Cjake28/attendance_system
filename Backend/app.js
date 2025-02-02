import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {errorHandler} from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import {userRoutes} from './routes/user.route.js';
import {createStudentRoutes} from './routes/createStudent.route.js';

dotenv.config();

export const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());

app.use('/api',userRoutes);
app.use('/api',createStudentRoutes);

app.use(errorHandler);


