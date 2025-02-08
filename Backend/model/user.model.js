import db from '../db/db.connect.js';
import AppError from "../utils/AppError.js";

export const createUser = async (name, username, password, role) => {
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

// ✅ Check if a username already exists
export const isUsernameTaken = async (username) => {
    const query = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;

    try {
        const [rows] = await db.execute(query, [username]);
        return rows.length > 0 && rows[0].count > 0; // Ensure `rows` is not empty
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to check username availability.",500);
    }
};
