const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient'); // import your initialized prisma client

router.post('/shop', async (req, res) => {
  const { userId, shopName, address, latitude, longitude } = req.body;

  try {
    const profile = await prisma.traderProfile.create({
      data: {
        userId,
        shopName,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
