import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    strap: {
      type: DataTypes.STRING,
    },
    movement: {
      type: DataTypes.STRING,
    },
    collection: {
      type: DataTypes.STRING,
    },
    diameter: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL(10, 1),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;
