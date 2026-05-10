require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const menusRoutes = require('./src/routes/menus');
const userRoutes = require('./src/routes/users');
const orderRoutes = require('./src/routes/orders');

const app = express();

const corsOptions = {
    origin: [
        process.env.KIOSK_URL,
        process.env.BACK_OFFICE_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Trop de requêtes, réessaie plus tard',
    },
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`L'api est lancé sur le port : ${PORT}`);
});