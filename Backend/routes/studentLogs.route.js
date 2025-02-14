import express from "express";
import { handleStudentLogs, getallStudetLogs } from "../controller/studentLogs.controller.js";

const studentLogs = express.Router();

studentLogs.post("/student-logs", handleStudentLogs); 
studentLogs.get("/student-logs", getallStudetLogs);

export default studentLogs;