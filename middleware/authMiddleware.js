// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if(!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX HERE
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
