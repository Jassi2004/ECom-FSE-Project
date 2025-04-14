import Category from "../db/models/category.js";
import tryCatch from "../utils/tryCatch.js";

const categoryController = {};

// Admin actions
categoryController.createCategory = tryCatch(async (req, res) => {
  const { name, createdByUserId } = req.body;
  const newCategory = await Category.create({ name, createdByUserId });
  res.status(201).json(newCategory);
});

categoryController.updateCategory = tryCatch(async (req, res) => {
  const { name, createdByUserId } = req.body;
  const [updatedRows] = await Category.update(
    { name, createdByUserId },
    {
      where: { id: req.params.id },
    }
  );
  if (updatedRows > 0) {
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

categoryController.deleteCategory = tryCatch(async (req, res) => {
  const deletedRows = await Category.destroy({
    where: { id: req.params.id },
  });
  if (deletedRows > 0) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// Public actions
categoryController.getAllCategories = tryCatch(async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

categoryController.getCategoryById = tryCatch(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

export default categoryController;
