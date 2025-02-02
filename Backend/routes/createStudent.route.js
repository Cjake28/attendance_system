import express from "express";
import { createStudent } from "../controller/createStudent.controller.js";
import upload from "../utils/multerConfig.js"; 

const createStudentRoutes = express.Router();

createStudentRoutes.post("/create-student", upload.array("images", 5), createStudent); 
// "images" should match the form-data key, max 5 images

export default createStudentRoutes;
