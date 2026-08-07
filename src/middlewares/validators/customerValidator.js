const { body } = require('express-validator');

const validateCustomer = [
    body('firstname')
        .notEmpty()
        .withMessage('Le prénom est obligatoire')
        .isLength({ min: 2, max: 150 })
        .withMessage('Le prénom doit contenir entre 2 et 150 caractères'),

    body('phone')
        .notEmpty()
        .withMessage('Le téléphone est obligatoire')
        .isMobilePhone('fr-FR')
        .withMessage('Numéro de téléphone invalide'),
];

/**
 * Validation lors de l'utilisation d'une récompense par un client.
 */
const validateCustomerRedeem = [
    body('reward_id')
        .notEmpty()
        .withMessage('La récompense est obligatoire')
        .isInt({ min: 1 })
        .withMessage('La récompense associée est invalide'),

    body('order_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La commande associée est invalide'),
];

/**
 * Validation lors de la modification manuelle des points (Administration).
 * Les points peuvent être négatifs pour retirer des points au client.
 */
const validateCustomerPoints = [
    body('points')
        .notEmpty()
        .withMessage('Le nombre de points est obligatoire')
        .isInt()
        .withMessage('Le nombre de points doit être un entier'),

    body('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('La description doit contenir au maximum 255 caractères'),
];

module.exports = {
    validateCustomer,
    validateCustomerRedeem,
    validateCustomerPoints,
};
