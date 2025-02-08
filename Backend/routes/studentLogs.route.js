import express from "express";
import { handleStudentLogs } from "../controller/studentLogs.controller.js";

const studentLogs = express.Router();

studentLogs.post("/student-logs", handleStudentLogs); 
// "images" should match the form-data key, max 5 images

export default studentLogs;