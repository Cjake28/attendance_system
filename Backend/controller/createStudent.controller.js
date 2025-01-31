import bcrypt from 'bcrypt';
import AppError from "../utils/AppError.js";
import {
    isUsernameTaken, 
    createStudentUsr, 
    isRfidTaken,
    createStudentData,
    storeStudentImage  // Function to store images
} from '../model/createStudent.model.js';

export const createStudent = async (req, res, next) => {
    const { name, username, password, role, parent_email, rfid_tag } = req.body;
    const images = req.files?.images || []; // Expecting multiple images

    if (!name || !username || !password || !role || !parent_email || !rfid_tag || images.length === 0) {
        throw new AppError("All fields and at least one image are required", 400);
    }

    // Normalize inputs
    const normalizedName = name.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    // Check if the username or RFID is already taken
    if (await isUsernameTaken(username)) { 
        throw new AppError("Username already taken", 400);
    }

    if (await isRfidTaken(rfid_tag)) { 
        throw new AppError("RFID already taken", 400);
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = await createStudentUsr(normalizedName, normalizedUsername, hashedPassword, role);

    // Create student data
    await createStudentData(user_id, parent_email, rfid_tag);

    // Store multiple face images
    for (const image of images) {
        const imageBuffer = image.buffer; // Assuming multer handles image uploads
        await storeStudentImage(user_id, imageBuffer);
    }

    res.status(201).json({ message: "Student registered successfully" });
};
