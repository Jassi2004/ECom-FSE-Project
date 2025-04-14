import Wishlist from "../db/models/wishlist.js";
import Product from "../db/models/product.js";
import tryCatch from "../utils/tryCatch.js";

const wishlistController = {};

wishlistController.getWishlist = tryCatch(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    where: { userId: req.user.id },
  });
  if (wishlist) {
    res.json(wishlist);
  } else {
    const wishlist = await Wishlist.create({
      userId: req.user.id,
    });
    res.json(wishlist); // User might not have a wishlist yet
  }
});

wishlistController.addItemToWishlist = tryCatch(async (req, res) => {
  const { productId } = req.body;
  const wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (!wishlist) {
    const newWishlist = await Wishlist.create({ userId: req.user.id });
    await newWishlist.update({
      productIds: [...newWishlist.productIds, product.id],
    });
    return res.status(201).json({ message: "Product added to wishlist" });
  }
  await wishlist.update({
    productIds: [...wishlist.productIds, product.id],
  });
  res.status(201).json({ message: "Product added to wishlist" });
});

wishlistController.removeItemFromWishlist = tryCatch(async (req, res) => {
  const { productId } = req.params;
  const wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });
  const product = await Product.findByPk(productId);
  if (!wishlist || !product) {
    return res.status(404).json({ message: "Wishlist or product not found" });
  }
  await wishlist.update({
    productIds: wishlist.productIds.filter((ele) => ele != product.id),
  });
  res.json({ message: "Product removed from wishlist" });
});

export default wishlistController;
