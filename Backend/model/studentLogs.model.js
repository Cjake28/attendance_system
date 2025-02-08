import db from '../db/db.connect.js';
import AppError from '../utils/AppError.js';

// ✅ Get student details from `students` table
export const getStudentData = async (user_id) => {
    const query = `SELECT rfid_tag, section FROM students WHERE user_id = ?;`;

    try {
        const [rows] = await db.query(query, [user_id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch student data.", 500);
    }
};

// ✅ Get the last log for a student on the current date
export const getLastLog = async (user_id, log_date) => {
    const query = `
        SELECT log_id, time_in, time_out
        FROM student_logs
        WHERE student_id = ? AND log_date = ?
        ORDER BY log_id DESC
        LIMIT 1;
    `;
    
    try {
        const [result] = await db.query(query, [user_id, log_date]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch getLastLog data.", 500);
    }
};


// ✅ Insert a time-in entry for a student
export const timeInStudent = async (user_id, rfid_tag, section, log_date, time) => {
    const query = `
        INSERT INTO student_logs (student_id, rfid_tag, section, log_date, time_in)
        VALUES (?, ?, ?, ?, ?);
    `;
    try {
        await db.query(query, [user_id, rfid_tag, section, log_date, time]);
        return {sucess: true,  status: "time_in", message: "Student successfully timed in." };
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create timeInStudent data.", 500);
    }

};

// ✅ Update an existing entry with a time-out
export const timeOutStudent = async (log_id, time) => {
    const query = `
        UPDATE student_logs SET time_out = ? WHERE log_id = ?;
    `;

    try {
        await db.query(query, [time, log_id]);
        return {sucess: true,  status: "time_out", message: "Student successfully timed out." };
    } catch (error){
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create timeOutStudent data.", 500);
    }
};
