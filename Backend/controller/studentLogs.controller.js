import AppError from "../utils/AppError.js";
import {
    createStudentLog,
    isStudentLoged,
    getAllStudentLogForADay
} from "../model/studentLogs.model.js";

// ✅ Create a student log
export const createStudentLogController = async (req, res, next) => {
    const { student_id, rfid_tag } = req.body;
    
    if (!student_id || !rfid_tag) {
        throw new AppError("Student ID and RFID tag are required", 400);
    }

    // Check if the student is already logged today
    const alreadyLogged = await isStudentLoged(student_id);
    if (alreadyLogged) {
        throw new AppError("Student has already logged in today", 400);
    }

    // Log the student
    await createStudentLog(student_id, rfid_tag);

    res.status(201).json({ success: true, message: "Student log created successfully" });
};

// ✅ Check if a student has already logged today
export const isStudentLogedController = async (req, res, next) => {
    const { student_id } = req.params;

    if (!student_id) {
        throw new AppError("Student ID is required", 400);
    }

    const alreadyLogged = await isStudentLoged(student_id);
    res.status(200).json({ success: true, logged: alreadyLogged });
};

// ✅ Get all logs for a specific day
export const getAllStudentLogForADayController = async (req, res, next) => {
    const { date } = req.params;

    if (!date) {
        throw new AppError("Date is required", 400);
    }

    const logs = await getAllStudentLogForADay(date);
res.status(200).json({success:true, logs});
};
