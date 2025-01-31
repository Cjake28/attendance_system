import bcrypt from 'bcrypt';
import AppError from "../utils/AppError.js";
import {
    isUsernameTaken, 
    createStudentUsr, 
    isRfidTaken
    } from '../model/createStudent.model.js'

export const createStudent = async(req, res, next) =>{
    const {name, username, password, role, parent_email, rfid_tag} = req.body;

    if (!name || !username || !password || !role || !parent_email || !rfid_tag) {
        throw new AppError("All fields are required", 400);
    }

    // Normalize inputs
    name = name.toLowerCase();
    username = username.toLowerCase();

    // Check if the username is already taken
    if (await isUsernameTaken(username)) { 
        throw new AppError("User already taken", 400);
    }

    // Check if the username is already taken
    if (await isRfidTaken(rfid_tag)){ 
        throw new AppError("User already taken", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = await createUser(name, username, hashedPassword, role);





}