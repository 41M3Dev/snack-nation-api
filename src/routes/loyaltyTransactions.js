const express = require('express');
const router = express.Router();

const { validateLoyaltyTransaction } = require('../middlewares/validators/loyaltyTransactionValidator');
const validate = require('../middlewares/validate');

const loyaltyTransactionController = require('../controllers/loyaltyTransactionController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /loyalty-transactions:
 *   get:
 *     summary: Liste de toutes les transactions
 *     tags: [Transactions fidélité]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/LoyaltyTransaction' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/', authenticate, authorize('Administration'), loyaltyTransactionController.getAll);

/**
 * @swagger
 * /loyalty-transactions/customer/{customerId}:
 *   get:
 *     summary: Transactions d'un client donné
 *     tags: [Transactions fidélité]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Liste des transactions du client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/LoyaltyTransaction' }
 *       401:
 *         description: Non authentifié
 */
router.get('/customer/:customerId', authenticate, loyaltyTransactionController.getByCustomer);

/**
 * @swagger
 * /loyalty-transactions:
 *   post:
 *     summary: Créer une transaction de fidélité
 *     tags: [Transactions fidélité]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoyaltyTransactionInput' }
 *     responses:
 *       201:
 *         description: Transaction créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/LoyaltyTransaction' }
 *       400:
 *         description: Validation échouée ou solde de points insuffisant
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.post('/', authenticate, authorize('Administration'), validateLoyaltyTransaction, validate, loyaltyTransactionController.create);

module.exports = router;
