import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const orderRouter = express.Router();

// User routes
orderRouter.post("/", authMiddleware, orderController.createOrder);
orderRouter.get("/me", authMiddleware, orderController.getUserOrders);
orderRouter.get("/:id", authMiddleware, orderController.getOrderById);

// Admin routes
orderRouter.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrdersAdmin
);
orderRouter.put(
  "/admin/:id/status",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatusAdmin
);

export default orderRouter;
