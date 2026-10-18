const express = require('express');
const router = express.Router();

const { validateMenu } = require('../middlewares/validators/menuValidator');
const validate = require('../middlewares/validate');

const menuController = require('../controllers/menuController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Liste des menus disponibles
 *     tags: [Menus]
 *     security: []
 *     responses:
 *       200:
 *         description: Liste des menus disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Menu' }
 */
router.get('/', menuController.getAll);

/**
 * @swagger
 * /menus/admin:
 *   get:
 *     summary: Liste complète des menus (admin)
 *     tags: [Menus]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste complète des menus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Menu' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/admin', authenticate, authorize('Administration'), menuController.getAllAdmin);

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Détail d'un menu
 *     tags: [Menus]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail du menu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Menu' }
 *       404:
 *         description: Menu non trouvé
 */
router.get('/:id', menuController.getById);

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Créer un menu
 *     tags: [Menus]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/MenuInput' }
 *     responses:
 *       201:
 *         description: Menu créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Menu' }
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.post('/', authenticate, authorize('Administration'), validateMenu, validate, menuController.create);

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Modifier un menu
 *     tags: [Menus]
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
 *           schema: { $ref: '#/components/schemas/MenuInput' }
 *     responses:
 *       200:
 *         description: Menu modifié
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Menu non trouvé
 */
router.put('/:id', authenticate, authorize('Administration'), validateMenu, validate, menuController.update);

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Supprimer un menu
 *     tags: [Menus]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Menu supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Menu non trouvé
 */
router.delete('/:id', authenticate, authorize('Administration'), menuController.remove);

module.exports = router;
