import express from 'express';

import validateRole from '../middleware/validateRole.js';
import {verifyToken} from '../middleware/verifyToken.js';

import {
    createAdminOrTeacher, 
    get_all_users, 
    unVerifyUser_byID, 
    deleteUser_byID,
    verifyUser_byID
    } from '../controller/user.controller.js';

export const userRoutes = express.Router();

userRoutes.post("/create-user-teacher", verifyToken,createAdminOrTeacher);
userRoutes.get("/get-all-users",verifyToken, validateRole("admin"),  get_all_users);
userRoutes.put("/unverify-user/:user_id", verifyToken, validateRole("admin"), unVerifyUser_byID);
userRoutes.delete("/delete-user/:user_id", verifyToken, validateRole("admin"), deleteUser_byID);
userRoutes.put("/verify-user/:user_id", verifyToken, validateRole("admin"), verifyUser_byID);