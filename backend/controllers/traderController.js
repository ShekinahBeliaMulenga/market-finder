const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create or update trader profile
const createOrUpdateTraderProfile = async (req, res) => {
  const { userId, shopName, address, latitude, longitude } = req.body;

  try {
    const profile = await prisma.traderProfile.upsert({
      where: { userId },
      update: {
        shopName,
        address,
        latitude,
        longitude,
      },
      create: {
        userId,
        shopName,
        address,
        latitude,
        longitude,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrUpdateTraderProfile };
