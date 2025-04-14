import express from "express";
import productController from "../controllers/productController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const productRouter = express.Router();

// Public routes
productRouter.get("/", productController.getAllProducts);
productRouter.get("/search", productController.searchProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/category/:slug", productController.getProductsByCategory);

// Admin routes
productRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);
productRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

export default productRouter;
