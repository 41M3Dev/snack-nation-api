const { body } = require('express-validator');

const validateLoyaltyTransaction = [
    body('customer_id')
        .notEmpty()
        .withMessage('Le client est obligatoire')
        .isInt({ min: 1 })
        .withMessage('Le client associé est invalide'),

    body('type')
        .notEmpty()
        .withMessage('Le type de transaction est obligatoire')
        .isIn(['earn', 'redeem', 'adjust'])
        .withMessage('Type de transaction invalide'),

    body('points')
        .notEmpty()
        .withMessage('Le nombre de points est obligatoire')
        .isInt({ min: 1 })
        .withMessage('Le nombre de points doit être un entier positif'),

    body('order_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La commande associée est invalide'),

    body('reward_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La récompense associée est invalide'),

    body('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('La description doit contenir au maximum 255 caractères'),
];

module.exports = {
    validateLoyaltyTransaction,
};
