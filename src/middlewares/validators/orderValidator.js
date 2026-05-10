const { body } = require('express-validator');

const validateOrder = [
    body('total')
        .notEmpty()
        .withMessage('Le nom est obligatoire')
        .isFloat({ min: 0 })
        .withMessage('Le prix doit être un nombre positif'),

    body('items')
        .notEmpty()
        .withMessage('L\'item est obligatoire')
        .withMessage('Items invalide'),

    body('source')
        .notEmpty()
        .withMessage('La Source est obligatoire')
        .isIn(["kiosk","counter","phone"])
        .withMessage('Source invalide')

];

module.exports = {
    validateOrder,
};