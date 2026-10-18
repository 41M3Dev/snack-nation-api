const express = require('express');
const router = express.Router();

const { validateUserCreate, validateUserUpdate} = require('../middlewares/validators/userValidator');
const validate = require('../middlewares/validate');

const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste de tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/', authenticate, authorize('Administration'), userController.getAllAdmin);

/**
 * @swagger
 * /users/active:
 *   get:
 *     summary: Liste des utilisateurs actifs
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs actifs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/active', authenticate, authorize('Administration'), userController.getAllAdminActive);

/**
 * @swagger
 * /users/noactive:
 *   get:
 *     summary: Liste des utilisateurs inactifs
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs inactifs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/noactive', authenticate, authorize('Administration'), userController.getAllAdminNoActive);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Rechercher un utilisateur par email
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string, format: email }
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/email/:email', authenticate, authorize('Administration'), userController.getByEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Détail d'un utilisateur
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', authenticate, authorize('Administration'), userController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserInput' }
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.post('/', authenticate, authorize('Administration'), validateUserCreate, validate, userController.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserInput' }
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:id', authenticate, authorize('Administration'), validateUserUpdate, validate, userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id',authenticate,authorize('Administration'),userController.remove);

module.exports = router;
