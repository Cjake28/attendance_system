import AppError from "../utils/AppError.js";

export default function validateRole (requiredRole) {
    return (req, res, next) => {
      if (!req.role) {
        throw new AppError("Unauthorized - No role found", 401);
      }
      console.log("🔴 validateRole: requiredRole", req.role);
      if (req.role === requiredRole) {
        return next();
      }

      throw new AppError("Unauthorized - You do not have permission to perform this action", 403);
    };
  };
  