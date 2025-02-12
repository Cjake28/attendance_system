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

export const findUserById = async (user_id) => {
    const query = `SELECT * FROM users WHERE user_id = ?`;
    try {
        const [rows] = await db.execute(query, [user_id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error("❌ file: user.model.js  Database Error:", error.message);
        throw new AppError("Failed to fetch user data.", 500);
    }
};

export const get_all_usersDB = async () => {
    const query = `
      SELECT 
        u.user_id, 
        u.name, 
        u.username, 
        u.role, 
        u.is_verified, 
        u.created_at,
        s.parent_email, 
        s.rfid_tag, 
        s.section
      FROM users u
      LEFT JOIN students s ON u.user_id = s.user_id;
    `;
  
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      throw error;
    }
  };

export const unverify_user_byID_model = async (user_id) => {
    const query = `UPDATE users SET is_verified = 0 WHERE user_id = ?`;
    try {
        const [result] = await db.execute(query, [user_id]);
        return Boolean(result.affectedRows);
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to unverify user.", 500);
    }
};

export const deleteUser_byID_model = async (user_id) => {
    const query = `DELETE FROM users WHERE user_id = ?`;
    try {
        const [result] = await db.execute(query, [user_id]);
        return Boolean(result.affectedRows);
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to delete user.", 500);
        
    }
}

export const verifyUser_byID_model = async (user_id) => {
    const query = `UPDATE users SET is_verified = 1 WHERE user_id = ?`;
    try {
        const [result] = await db.execute(query, [user_id]);
        return Boolean(result.affectedRows);
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to verify user.", 500);
    }
};