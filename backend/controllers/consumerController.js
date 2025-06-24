const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createConsumerProfile = async (req, res) => {
  const { userId, name } = req.body;

  try {
    const profile = await prisma.consumerProfile.create({
      data: {
        userId,
        name
      }
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createConsumerProfile };
