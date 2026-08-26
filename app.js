require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const menusRoutes = require('./src/routes/menus');
const userRoutes = require('./src/routes/users');
const orderRoutes = require('./src/routes/orders');
const customerRoutes = require('./src/routes/customers');
const rewardRoutes = require('./src/routes/rewards');
const loyaltyConfigRoutes = require('./src/routes/loyaltyConfig');
const loyaltyTransactionRoutes = require('./src/routes/loyaltyTransactions');

app.use(cors());
app.use(express.json());

// Sécurité headers HTTP
app.use(helmet());

// Protection contre le brute force / DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: { code: 429, message: 'Trop de requêtes, réessayez plus tard.' } },
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/loyalty-config', loyaltyConfigRoutes);
app.use('/api/loyalty-transactions', loyaltyTransactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port : ${PORT}`);
});