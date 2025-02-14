import db from '../db/db.connect.js';
import AppError from '../utils/AppError.js';

// ✅ Get student details from `students` and `users` tables
export const getStudentData = async (user_id) => {
    const query = `
        SELECT s.rfid_tag, s.section, s.parent_email, u.name
        FROM students s
        JOIN users u ON s.user_id = u.user_id
        WHERE s.user_id = ?;
    `;

    try {
        const [rows] = await db.execute(query, [user_id]);
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
        WHERE user_id = ? AND log_date = ?
        ORDER BY log_id DESC
        LIMIT 1;
    `;
    
    try {
        const [result] = await db.execute(query, [user_id, log_date]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch getLastLog data.", 500);
    }
};

// ✅ Insert a time-in entry for a student (Fix: Add `time_in` parameter)
export const timeInStudent = async (user_id, rfid_tag, name, section, log_date, time) => {
    const query = `
        INSERT INTO student_logs (user_id, rfid_tag, name, section, log_date, time_in)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    try {
        await db.execute(query, [user_id, rfid_tag, name, section, log_date, time]);
        return { success: true, status: "time_in", message: "Student successfully timed in." };
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create timeInStudent data.", 500);
    }
};

// ✅ Update an existing entry with a time-out (Fix: Use `time` argument instead of `NOW()`)
export const timeOutStudent = async (log_id, time) => {
    const query = `
        UPDATE student_logs 
        SET time_out = ? 
        WHERE log_id = ?;
    `;

    try {
        await db.execute(query, [time, log_id]);
        return { success: true, status: "time_out", message: "Student successfully timed out." };
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create timeOutStudent data.", 500);
    }
};

export const getALlStudentLogs_model = async () => {
    const query = `
        SELECT * FROM student_logs;
    `;
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch student logs.", 500);
    }
};

export const studetLogsbystudentId_model = async (studentId) => {
    const query = `
        SELECT * FROM student_logs WHERE user_id = ?;
    `;
    try {
        const [rows] = await db.execute(query, [studentId]);
        return rows;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch student logs.", 500);
    }
}