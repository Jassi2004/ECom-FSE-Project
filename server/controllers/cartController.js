import Cart from "../db/models/cart.js";
import OrderItem from "../db/models/orderItem.js";
import Product from "../db/models/product.js";
import tryCatch from "../utils/tryCatch.js";

const cartController = {};

cartController.getCart = tryCatch(async (req, res) => {
  const cart = await Cart.findOne({
    where: { userId: req.user.id },
  });
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found for this user" });
  }
});

cartController.addItemToCart = tryCatch(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ where: { userId: req.user.id } });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found for this user" });
  }
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingItem = await OrderItem.findOne({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
    await existingItem.save();
    res.json(existingItem);
  } else {
    const newItem = await OrderItem.create({
      cartId: cart.id,
      productId,
      quantity: parseInt(quantity),
    });
    res.status(201).json(newItem);
  }
});

cartController.updateCartItemQuantity = tryCatch(async (req, res) => {
  const { orderItemId } = req.params;
  const { quantity } = req.body;
  const orderItem = await OrderItem.findByPk(orderItemId);
  if (!orderItem) {
    return res.status(404).json({
      message: "Cart item not found",
    });
  }
  const cart = await Cart.findByPk(orderItem.cartId);
  if (cart.userId != req.user.id) {
    return res.status(404).json({
      message: "Cart item does not belong to this user",
    });
  }
  const updatedItem = await OrderItem.update(
    { quantity: parseInt(quantity) },
    {
      where: { id: orderItemId },
    }
  );
  if (updatedItem[0] > 0) {
    const item = await OrderItem.findByPk(orderItemId);
    res.json(item);
  } else {
    res.status(404).json({
      message: "Cart item not found",
    });
  }
});

cartController.removeCartItem = tryCatch(async (req, res) => {
  const { orderItemId } = req.params;

  const orderItem = await OrderItem.findByPk(orderItemId);
  if (!orderItem) {
    return res.status(404).json({
      message: "Cart item not found",
    });
  }
  const cart = await Cart.findByPk(orderItem.cartId);
  if (cart.userId != req.user.id) {
    return res.status(404).json({
      message: "Cart item does not belong to this user",
    });
  }

  const deletedRows = await OrderItem.destroy({
    where: { id: orderItemId },
  });
  if (deletedRows > 0) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({
      message: "Cart item not found",
    });
  }
});

export default cartController;
