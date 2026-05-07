require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port :  ${PORT}`);
});
