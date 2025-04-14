import express from "express";
import wishlistController from "../controllers/wishlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const wishlistRouter = express.Router();

wishlistRouter.get("/", authMiddleware, wishlistController.getWishlist);
wishlistRouter.post(
  "/items",
  authMiddleware,
  wishlistController.addItemToWishlist
);
wishlistRouter.delete(
  "/items/:productId",
  authMiddleware,
  wishlistController.removeItemFromWishlist
);

export default wishlistRouter;
