import express from "express";
import validateRole from '../middleware/validateRole.js';
import {verifyToken} from '../middleware/verifyToken.js';
import { handleStudentLogs, getallStudetLogs, getStudentLogsByStudentId } from "../controller/studentLogs.controller.js";

const studentLogs = express.Router();

studentLogs.post("/student-logs", handleStudentLogs); 
studentLogs.get("/student-logs", verifyToken, validateRole(["admin", "teacher"]),getallStudetLogs);
studentLogs.get("/self-student-log",verifyToken,validateRole(["student"]), getStudentLogsByStudentId);

export default studentLogs;