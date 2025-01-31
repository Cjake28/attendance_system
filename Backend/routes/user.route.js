import express from 'express';
import {createAdminOrTeacher} from '../controller/user.controller.js';

export const userRoutes = express.Router();

userRoutes.post("/create-user-teacher", createAdminOrTeacher);