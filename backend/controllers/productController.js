const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a category
const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a product under a category
const addProduct = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        categoryId
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View all categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  addProduct,
  getCategories,
};
