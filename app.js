require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();
app.use(express.json());
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port :  ${PORT}`);
});
