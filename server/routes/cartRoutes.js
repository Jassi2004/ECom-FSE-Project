import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const cartRouter = express.Router();

cartRouter.get("/", authMiddleware, cartController.getCart);
cartRouter.post("/items", authMiddleware, cartController.addItemToCart);
cartRouter.put(
  "/items/:itemId",
  authMiddleware,
  cartController.updateCartItemQuantity
);
cartRouter.delete(
  "/items/:itemId",
  authMiddleware,
  cartController.removeCartItem
);

export default cartRouter;
