import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import tryCatch from "../utils/tryCatch.js";

const authMiddleware = tryCatch(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication required: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] }, // Don't fetch the password
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid user" });
    }

    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
});

export default authMiddleware;
