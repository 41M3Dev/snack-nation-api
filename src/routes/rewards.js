const express = require('express');
const router = express.Router();

const { validateReward } = require('../middlewares/validators/rewardValidator');
const validate = require('../middlewares/validate');

const rewardController = require('../controllers/rewardController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /rewards:
 *   get:
 *     summary: Liste des récompenses disponibles
 *     tags: [Récompenses]
 *     security: []
 *     responses:
 *       200:
 *         description: Liste des récompenses disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Reward' }
 */
router.get('/', rewardController.getAll);

/**
 * @swagger
 * /rewards/admin/:
 *   get:
 *     summary: Liste complète des récompenses (admin)
 *     tags: [Récompenses]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste complète des récompenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Reward' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/admin/', authenticate, authorize('Administration'), rewardController.getAllAdmins);

/**
 * @swagger
 * /rewards/{id}:
 *   get:
 *     summary: Détail d'une récompense
 *     tags: [Récompenses]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail de la récompense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Reward' }
 *       404:
 *         description: Récompense non trouvée
 */
router.get('/:id', rewardController.getById);

/**
 * @swagger
 * /rewards/admin/:
 *   post:
 *     summary: Créer une récompense
 *     tags: [Récompenses]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RewardInput' }
 *     responses:
 *       201:
 *         description: Récompense créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Reward' }
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.post('/admin/', authenticate, authorize('Administration'), validateReward, validate, rewardController.create);

/**
 * @swagger
 * /rewards/{id}:
 *   put:
 *     summary: Modifier une récompense
 *     tags: [Récompenses]
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
 *           schema: { $ref: '#/components/schemas/RewardInput' }
 *     responses:
 *       200:
 *         description: Récompense modifiée
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Récompense non trouvée
 */
router.put('/:id', authenticate, authorize('Administration'), validateReward, validate, rewardController.update);

/**
 * @swagger
 * /rewards/{id}:
 *   delete:
 *     summary: Supprimer une récompense
 *     tags: [Récompenses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Récompense supprimée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Récompense non trouvée
 */
router.delete('/:id', authenticate, authorize('Administration'), rewardController.remove);

module.exports = router;
