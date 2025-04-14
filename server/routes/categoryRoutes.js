import categoryController from "../controllers/categoryController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const categoryRouter = express.Router();

// Public routes
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);

// Admin routes
categoryRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  categoryController.createCategory
);
categoryRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.deleteCategory
);

export default categoryRouter;
