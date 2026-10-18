const express = require('express');
const router = express.Router();

const { validateLoyaltyConfig } = require('../middlewares/validators/loyaltyConfigValidator');
const validate = require('../middlewares/validate');

const loyaltyConfigController = require('../controllers/loyaltyConfigController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /loyalty-config:
 *   get:
 *     summary: Liste des paramètres de fidélité
 *     tags: [Configuration fidélité]
 *     security: []
 *     responses:
 *       200:
 *         description: Liste des paramètres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/LoyaltyConfig' }
 */
router.get('/', loyaltyConfigController.getAll);

/**
 * @swagger
 * /loyalty-config/{key}:
 *   get:
 *     summary: Détail d'un paramètre
 *     tags: [Configuration fidélité]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string }
 *         example: points_per_euro
 *     responses:
 *       200:
 *         description: Détail du paramètre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/LoyaltyConfig' }
 *       404:
 *         description: Paramètre non trouvé
 */
router.get('/:key', loyaltyConfigController.getByKey);

/**
 * @swagger
 * /loyalty-config/{key}:
 *   put:
 *     summary: Modifier un paramètre
 *     tags: [Configuration fidélité]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string }
 *         example: points_per_euro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoyaltyConfigInput' }
 *     responses:
 *       200:
 *         description: Paramètre modifié
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Paramètre non trouvé
 */
router.put('/:key', authenticate, authorize('Administration'), validateLoyaltyConfig, validate, loyaltyConfigController.update);

module.exports = router;
