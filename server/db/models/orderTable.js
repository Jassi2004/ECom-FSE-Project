import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const OrderTable = sequelize.define(
  "OrderTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default OrderTable;
