const { body } = require('express-validator');

const validateMenu = [
    body('name')
        .notEmpty()
        .withMessage('Le nom est obligatoire')
        .isLength({ min: 2, max: 150 })
        .withMessage('Le nom doit contenir entre 2 et 150 caractères'),
    body('products')
        .isArray({ min: 1 })
        .withMessage('Le menu doit contenir au moins un produit'),
    body('price_base')
        .notEmpty()
        .withMessage('Le prix est obligatoire')
        .isFloat({ min: 0 })
        .withMessage('Le prix doit être un nombre positif'),
];

module.exports = {
    validateMenu,
};