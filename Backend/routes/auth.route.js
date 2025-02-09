import express from 'express';
import {signin} from '../controller/auth/signin.controller.js';
import {checkAuth} from '../controller/auth/checkAuth.controller.js';
import {verifyToken} from '../middleware/verifyToken.js';
import {signout} from '../controller/auth/signout.controller.js';
import {checkAuth_VerifyToken} from '../middleware/checkAUthVerifytoken.js'
const authRoutes = express.Router();

authRoutes.post("/signin",signin);

authRoutes.get("/check-auth", checkAuth_VerifyToken, checkAuth);
authRoutes.post("/signout", verifyToken, signout);

export default authRoutes;