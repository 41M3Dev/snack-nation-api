require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const menusRoutes = require('./src/routes/menus');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menus', menusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port :  ${PORT}`);
});
