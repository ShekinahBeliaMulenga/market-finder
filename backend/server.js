const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const traderRoutes = require('./routes/traderRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trader', traderRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/product', productRoutes);     
app.use('/api/inventory', inventoryRoutes);
app.use('/api/search', searchRoutes);
app.post('/api/trader/create-profile',traderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
