import AppError from '../utils/AppError.js';
import {sendTimeInNotification, sendTimeOutNotification} from '../nodemailer/send.email.js'
import { getStudentData, 
    getLastLog, timeInStudent, 
    timeOutStudent, 
    getALlStudentLogs_model, 
    studetLogsbystudentId_model } from '../model/studentLogs.model.js';

export const handleStudentLogs = async (req, res) => {
    const { user_id, log_date, time } = req.body;

    if (!user_id || !log_date || !time) {
        throw new AppError("Missing required fields (user_id, log_date, time).", 400);
    }

    try {
        // ✅ Get student data (rfid_tag, section, name) from students and users tables
        const student = await getStudentData(user_id);
        if (!student) {
            throw new AppError("Student not found.", 404);
        }

        const { rfid_tag, section, parent_email, name } = student;

        // ✅ Get the last log for this student
        const lastLog = await getLastLog(user_id, log_date);
        
        if (!lastLog) {
            // No record for today, proceed with time-in

            const result = await timeInStudent(user_id, rfid_tag, name, section, log_date, time);
            await sendTimeInNotification(parent_email, name, log_date, time);
            return res.status(200).json(result);
        }
        
        const { log_id, time_in, time_out } = lastLog;

        // ❌ If the student has already timed in and timed out today, block further logs
        if (time_in && time_out) {
            return res.status(400).json({
                success: false,
                status: "already_completed",
                message: "Student has already timed in and out today. Please wait until the next day."
            });
        }

        // ❌ Prevent spamming logs by checking time difference
        const time_diff = getTimeDiffInMinutes(time_in, time);
        console.log("Time difference:", time_diff, "minutes");
        if (time_diff < 3) {
            return res.status(200).json({
                success: false,
                status: "already_timed_in",
                message: "Please wait before tapping again."
            });
        }

        // ✅ If only time_in exists but no time_out, proceed with time-out
        if (!time_out) {
            const result = await timeOutStudent(log_id, time);
            await sendTimeOutNotification(parent_email, name, log_date, time);
            return res.status(200).json(result);
        }

    } catch (error) {
        console.error("Error handling student tap:", error);
        throw new AppError("Failed to handle student tap.", 500);
    }
};

// ✅ Helper function to calculate time difference in minutes
function getTimeDiffInMinutes(time1, time2) {
    const now = new Date();  // Get current date
    const [h1, m1, s1] = time1.split(":").map(Number);
    const [h2, m2, s2] = time2.split(":").map(Number);

    const date1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h1, m1, s1);
    const date2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h2, m2, s2);

    const diffMs = Math.abs(date2 - date1);
    return Math.floor(diffMs / 60000);
}


export const getallStudetLogs = async (req, res) => {
    try {
        const result = await getALlStudentLogs_model();
        const setdata = new Set(result.map((item) => item.section));
        
        return res.status(200).json({ success: true, data: result, sections: [...setdata] });
    } catch (error) {
        console.error("Error fetching student logs:", error);
        throw new AppError("Failed to fetch student logs.", 500);
    }
}

export const getStudentLogsByStudentId = async (req, res) => {
    const user_id = req.userId;
    try {
        const result = await studetLogsbystudentId_model(user_id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error fetching student logs:", error);
        throw new AppError("Failed to fetch student logs.", 500);
    }
};