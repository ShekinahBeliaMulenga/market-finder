const { PrismaClient } = require('@prisma/client');
const { getDistance } = require('geolib');

const prisma = new PrismaClient();

// Search for product and nearby traders
const searchProductsNearby = async (req, res) => {
  const { productName, userLatitude, userLongitude } = req.body;

  // Validate if location and product name are provided
  if (!productName || !userLatitude || !userLongitude) {
    return res.status(400).json({ message: 'Product name and location are required' });
  }

  try {
    // Find the product by name
    const product = await prisma.product.findFirst({
      where: {
        name: {
          contains: productName,
          mode: 'insensitive',
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find traders who have the product in stock
    const inventories = await prisma.inventory.findMany({
      where: {
        productId: product.id,
        quantity: {
          gt: 0, // Only return traders with available stock
        },
      },
      include: {
        trader: {
          include: {
            user: true, // Include trader user info
          },
        },
        product: true, // Include product details
      },
    });

    if (inventories.length === 0) {
      return res.status(404).json({ message: 'No traders have this product in stock' });
    }

    // Calculate distance for each trader and sort by proximity
    const results = inventories.map(inv => {
      const distance = getDistance(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: inv.trader.latitude, longitude: inv.trader.longitude }
      );

      return {
        trader: {
          id: inv.trader.id,
          shopName: inv.trader.shopName,
          address: inv.trader.address,
          latitude: inv.trader.latitude,
          longitude: inv.trader.longitude,
        },
        product: {
          name: inv.product.name,
          price: inv.price,
          quantity: inv.quantity,
        },
        distanceInMeters: distance, // Distance in meters
      };
    }).sort((a, b) => a.distanceInMeters - b.distanceInMeters); // Sort by distance

    // Send results as response
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchProductsNearby };
