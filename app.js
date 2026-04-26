require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port :  ${PORT}`);
});