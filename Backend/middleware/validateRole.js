import AppError from "../utils/AppError.js";

export default function validateRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.role) {
      throw new AppError("Unauthorized - No role found", 401);
    }

    console.log("🔴 validateRole: User role:", req.role);
    
    if (allowedRoles.includes(req.role)) {
      return next();
    }

    throw new AppError("Unauthorized - You do not have permission to perform this action", 403);
  };
}
