import jwt from "jsonwebtoken";
import AppError from "../utils/AppError"; // Adjust the path as necessary

export const checkAuth_VerifyToken = (req, res, next) => {
    const token = req.cookies.HimlayanToken;

    if (!token) {
        console.log('checkAuth: No token');
        return next(new AppError("No token", 401)); // Unauthorized error
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log('checkAuth: Invalid token');
            return next(new AppError("Invalid token", 401)); // Unauthorized error
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        req.name = decoded.name;
        next();
    } catch (error) {
        console.log("Error in verifyToken:", error);
        return next(new AppError("Server error", 500)); // Internal server error
    }
};
