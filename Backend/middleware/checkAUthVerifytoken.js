import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js"; 

export const checkAuth_VerifyToken = (req, res, next) => {
    const token = req.cookies.HimlayanToken;

    if (!token) {
        console.log("🔴 checkAuth: No token");
        throw new AppError("No token", 401); // Automatically caught by Express 5
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        console.log("🔴 checkAuth: Invalid token");
        throw new AppError("Invalid token", 401);
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    req.name = decoded.name;

    console.log("✅ Token verified successfully");
    next();
};
