import bcrypt from 'bcrypt';
import AppError from "../utils/AppError.js"; 
import { 
  createUser, 
  isUsernameTaken, 
  get_all_usersDB, 
  unverify_user_byID_model,
  deleteUser_byID_model,
  findUserById,
  verifyUser_byID_model 
} from '../model/user.model.js';

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

export const get_all_users = async (req, res) => {
    try {
      const users = await get_all_usersDB();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
  };


export const unVerifyUser_byID = async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await findUserById(user_id);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      const result = await unverify_user_byID_model(user_id);
      if (!result) {
        throw new AppError("Failed to unverify user", 500);
      }
      res.status(200).json({ success: true, message: "User unverified successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to unverify user" });
    }
};

export const deleteUser_byID = async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await findUserById(user_id);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      const result = await deleteUser_byID_model(user_id);
      if (!result) {
        throw new AppError("Failed to delete user", 500);
      }

      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      throw new AppError("Failed to delete user", 500);
    }
};

export const verifyUser_byID = async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await findUserById(user_id);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      const result = await verifyUser_byID_model(user_id);
      if (!result) {
        throw new AppError("Failed to verify user", 500);
      }
      res.status(200).json({ success: true, message: "User verified successfully" });
    } catch (error) {
      throw new AppError("Failed to verify user", 500);
    }
}