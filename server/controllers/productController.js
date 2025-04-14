import sequelize from "../db/config.js";
import Product from "../db/models/product.js";
import tryCatch from "../utils/tryCatch.js";

const productController = {};

// Admin actions
productController.createProduct = tryCatch(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    categoryId,
    imageUrl,
  });
  const productWithCategories = await Product.findByPk(newProduct.id);
  res.status(201).json(productWithCategories);
});

productController.updateProduct = tryCatch(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  const [updatedRows] = await Product.update(
    { name, description, price, stock, categoryId, imageUrl },
    {
      where: { id: req.params.id },
    }
  );
  if (updatedRows > 0) {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

productController.deleteProduct = tryCatch(async (req, res) => {
  const deletedRows = await Product.destroy({
    where: { id: req.params.id },
  });
  if (deletedRows > 0) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Public actions
productController.getAllProducts = tryCatch(async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

productController.getProductById = tryCatch(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

productController.getProductsByCategory = tryCatch(async (req, res) => {
  const products = await Product.findAll({
    where: { categoryId: req.params.slug },
  });
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: "Products not found" });
  }
});

productController.searchProducts = tryCatch(async (req, res) => {
  const { query } = req.query;

  const products = await Product.findAll({
    where: {
      [sequelize.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } },
      ],
    },
  });
  res.json(products);
});

export default productController;
