const { body } = require('express-validator');

const validateLoyaltyConfig = [
    body('config_value')
        .notEmpty()
        .withMessage('La valeur de configuration est obligatoire')
        .isLength({ max: 100 })
        .withMessage('La valeur de configuration doit contenir au maximum 100 caractères'),
];

module.exports = {
    validateLoyaltyConfig,
};
