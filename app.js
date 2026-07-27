require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');

const app = express();
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const menusRoutes = require('./src/routes/menus');
const userRoutes = require('./src/routes/users');
const orderRoutes = require('./src/routes/orders');
const customerRoutes = require('./src/routes/customers');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port :  ${PORT}`);
});
