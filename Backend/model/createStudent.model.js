import db from '../db/db.connect.js';
import AppError from '../utils/AppError.js';

// create student user
export const createStudentUsr = async (name, username, password, role) => {
    const query = `
        INSERT INTO users (name, username, password, role)
        VALUES (?, ?, ?, ?);
    `;

    const values = [name, username, password, role];

    try {
        const [result] = await db.execute(query, values);
        return result.insertId; // Returns the new user's ID
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create user. Please try again later.", 500);
    }
};

export const createStudentData = async (user_id, parent_email, rfid_tag) => {
    const query = `
        INSERT INTO students (user_id, parent_email, rfid_tag)
        VALUES (?, ?, ?);
    `;

    const values = [user_id, parent_email, rfid_tag];

    try {
        await db.execute(query, values);
        return { success: true, user_id };
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to create student data. Please try again later.", 500);
    }
};

export const storeStudentImage = async (user_id, imageBuffer) => {
    const query = `
        INSERT INTO student_images (user_id, image)
        VALUES (?, ?);
    `;

    try {
        await db.execute(query, [user_id, imageBuffer]);
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to store student image. Please try again later.", 500);
    }
};

// ✅ Check if a username already exists
export const isUsernameTaken = async (username) => {
    const query = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;
    
    try {
        const [rows] = await db.execute(query, [username]);
        return rows[0].count > 0; // Returns true if username exists
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to check username availability.", 500);
    }
};

// ✅ Check if a rfid already exists
export const isRfidTaken = async(rfid_tag) =>{
    const query = `SELECT COUNT(*) AS count FROM students WHERE rfid_tag = ?`; 
    
    try {
        const [rows] = await db.execute(query, [rfid_tag]);
        return rows[0].count > 0; // Returns true if rfid exists
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to check rfid availability.", 500);
    }
}




