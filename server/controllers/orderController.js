import Cart from "../db/models/cart.js";
import OrderTable from "../db/models/orderTable.js";
import sequelize from "../db/config.js";
import Product from "../db/models/product.js";
import OrderItem from "../db/models/orderItem.js";
import tryCatch from "../utils/tryCatch.js";

const orderController = {};

orderController.createOrder = tryCatch(async (req, res) => {
  const transaction = await sequelize.transaction();

  const cart = await Cart.findOne({
    where: { userId: req.user.id },
    transaction,
  });

  if (!cart || cart.orderIds.length === 0) {
    await transaction.rollback();
    return res.status(400).json({ message: "Your cart is empty" });
  }

  let totalAmount = 0;
  for (const orderId of cart.orderIds) {
    const item = OrderItem.findByPk(orderId);
    const product = Product.findByPk(item.productId);
    totalAmount += item.quantity * product.price;
  }

  const order = await OrderTable.create(
    {
      userId: req.user.id,
      totalPrice: totalAmount,
    },
    { transaction }
  );

  for (const orderId of cart.orderIds) {
    const item = OrderItem.findByPk(orderId, { transaction });
    const product = Product.findByPk(item.productId, { transaction });
    // Optionally update product stock here (consider race conditions and more robust inventory management)
    if (product && product.inventory >= item.quantity) {
      await product.update(
        { inventory: product.inventory - item.quantity },
        { transaction }
      );
    } else if (product) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: `Insufficient stock for product: ${product.name}` });
    } else {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: `Product not found: ${item.productId}` });
    }
    await item.update(
      { cartId: null, orderTableId: order.id },
      { transaction }
    );
  }

  await transaction.commit();
  res
    .status(201)
    .json({ message: "Order created successfully", orderId: order.id });
});

orderController.getUserOrders = tryCatch(async (req, res) => {
  const orders = await OrderTable.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]],
  });
  res.json(orders);
});

orderController.getOrderById = tryCatch(async (req, res) => {
  const order = await OrderTable.findByPk(req.params.id, {
    where: { userId: req.user.id }, // Ensure user can only access their own orders
  });
  if (order) {
    res.json(order);
  } else {
    res
      .status(404)
      .json({ message: "Order not found or does not belong to this user" });
  }
});

// Admin actions (example)
orderController.getAllOrdersAdmin = tryCatch(async (req, res) => {
  const orders = await OrderTable.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(orders);
});

orderController.updateOrderStatusAdmin = tryCatch(async (req, res) => {
  const { status } = req.body;
  const [updatedRows] = await OrderTable.update(
    { status },
    { where: { id: req.params.id } }
  );
  if (updatedRows > 0) {
    const updatedOrder = await OrderTable.findByPk(req.params.id);
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

export default orderController;
