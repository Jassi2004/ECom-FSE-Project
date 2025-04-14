import tryCatch from "../utils/tryCatch.js";

const adminMiddleware = tryCatch((req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next(); // User is an admin, proceed
  } else {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }
});

export default adminMiddleware;
