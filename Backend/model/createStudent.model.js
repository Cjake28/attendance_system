import db from '../db/db.connect';

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

const createStudentData = async(user_id, parent_email, rfid_tag) =>{
    const query = `
        INSERT INTO users (user_id, parent_email, rfid_tag)
        VALUES (?, ?, ?);
    `;

    const values = [user_id, parent_email, rfid_tag];
}

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
    const query = `SELECT COUNT(*) AS count FROM users WHERE rfid = ?`; 
    
    try {
        const [rows] = await db.execute(query, [rfid]);
        return rows[0].count > 0; // Returns true if rfid exists
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to check rfid availability.", 500);
    }
}




