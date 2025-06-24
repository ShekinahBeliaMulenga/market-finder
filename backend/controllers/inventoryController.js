const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add inventory for a trader
const addInventory = async (req, res) => {
  const { traderId, productId, quantity, price } = req.body;

  try {
    const inventory = await prisma.inventory.create({
      data: {
        traderId,
        productId,
        quantity,
        price,
      },
    });

    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get inventory for a specific trader
const getTraderInventory = async (req, res) => {
  const traderId = parseInt(req.params.traderId);

  try {
    const inventory = await prisma.inventory.findMany({
      where: { traderId },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addInventory, getTraderInventory };
