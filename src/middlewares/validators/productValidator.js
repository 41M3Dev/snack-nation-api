const { body } = require('express-validator');

const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Le nom est obligatoire')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères'),

    body('price')
        .notEmpty()
        .withMessage('Le prix est obligatoire')
        .isFloat({ min: 0 })
        .withMessage('Le prix doit être un nombre positif'),

    body('category')
        .notEmpty()
        .withMessage('La catégorie est obligatoire')
        .isIn(['burger', 'accompagnement', 'boisson', 'sauce'])
        .withMessage('Catégorie invalide')

];

module.exports = {
    validateProduct,
};