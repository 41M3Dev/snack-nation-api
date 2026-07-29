const { body } = require('express-validator');

const validateReward = [
    body('name')
        .notEmpty()
        .withMessage('Le nom est obligatoire')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères'),

    body('points_required')
        .notEmpty()
        .withMessage('Le nombre de points requis est obligatoire')
        .isInt({ min: 1 })
        .withMessage('Le nombre de points requis doit être un entier positif'),

    body('reward_type')
        .notEmpty()
        .withMessage('Le type de récompense est obligatoire')
        .isIn(['product', 'discount'])
        .withMessage('Type de récompense invalide'),

    body('reward_value')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('La valeur de la récompense doit être un nombre positif'),

    body('product_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Le produit associé est invalide'),
];

module.exports = {
    validateReward,
};
