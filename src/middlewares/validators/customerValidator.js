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

module.exports = {
    validateCustomer,
};
