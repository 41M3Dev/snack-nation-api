const { body } = require('express-validator');

const validateUser = [
    body('name')
        .notEmpty()
        .withMessage('Le nom est obligatoire')
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères'),

    body('email')
        .notEmpty()
        .withMessage('L\'email est obligatoire')
        .isEmail()
        .withMessage('Email invalide'),

    body('password')
        .notEmpty()
        .withMessage('Le mot de passe est obligatoire')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères'),

    body('role')
        .notEmpty()
        .withMessage('La Rôle est obligatoire')
        .isIn(['Administration', 'Préparation', 'Accueil'])
        .withMessage('Rôle invalide')

];

module.exports = {
    validateUser,
};