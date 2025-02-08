import bcrypt from 'bcrypt';
import { createUser, isUsernameTaken } from '../model/user.model.js';
import AppError from "../utils/AppError.js"; 

export const createAdminOrTeacher = async (req, res, next) => {
    let { name, username, password, role } = req.body;

    if(!name || !username || !password || !role) {
        throw new AppError("All fields are required", 400);
    }

    // Normalize inputs
    name = name.toLowerCase();
    username = username.toLowerCase();

    // Check if the username is already taken
    if (await isUsernameTaken(username)) { 
        throw new AppError("User already taken", 400);
    }

    if (!["admin", "teacher"].includes(role)) {
        console.log("🔴 createAdminOrTeacher: Invalid role");
        throw new AppError("Invalid role", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = await createUser(name, username, hashedPassword, role);
    
    res.status(201).json({ success: true, user_id });
};
