const { body } = require('express-validator');

/**
 * Validation à la création d'un utilisateur.
 * Tous les champs sont obligatoires, mot de passe inclus.
 */
const validateUserCreate = [
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
        .withMessage('Le rôle est obligatoire')
        .isIn(['Administration', 'Préparation', 'Accueil'])
        .withMessage('Rôle invalide'),
];

/**
 * Validation à la modification d'un utilisateur.
 * Le mot de passe est optionnel : s'il est fourni, il doit respecter la
 * longueur minimale. S'il est vide, on ne le change pas côté contrôleur.
 */
const validateUserUpdate = [
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
        .optional({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères'),

    body('role')
        .notEmpty()
        .withMessage('Le rôle est obligatoire')
        .isIn(['Administration', 'Préparation', 'Accueil'])
        .withMessage('Rôle invalide'),
];


module.exports = {
    validateUserCreate,
    validateUserUpdate,
};