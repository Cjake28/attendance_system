import db from '../db/db.connect.js';

// ✅ Create a student log
export const createStudentLog = async (student_id, rfid_tag) => {
    const query = `
        INSERT INTO student_logs (student_id, rfid_tag)
        VALUES (?, ?);
    `;
    try {
        await db.execute(query, [student_id, rfid_tag]);
        return true
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new Error("Failed to create student log.");
    }
};

// ✅ Check if a student is already logged today
export const isStudentLoged = async (student_id) => {
    const query = `
        SELECT COUNT(*) AS count FROM student_logs
        WHERE student_id = ? AND DATE(log_date) = CURDATE();
    `;
    try {
        const [rows] = await db.execute(query, [student_id]);
        return rows[0].count > 0; // Returns true if student has already logged today
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new Error("Failed to check student log status.");
    }
};

// ✅ Get all student logs for a specific day
export const getAllStudentLogForADay = async (date) => {
    const query = `
        SELECT * FROM student_logs
        WHERE DATE(log_date) = ?;
    `;
    try {
        const [rows] = await db.execute(query, [date]);
        return rows; // Returns all logs for the specified date
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new Error("Failed to retrieve student logs.");
    }
};
