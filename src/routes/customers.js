const express = require('express');
const router = express.Router();

const { validateCustomer, validateCustomerRedeem, validateCustomerPoints } = require('../middlewares/validators/customerValidator');
const validate = require('../middlewares/validate');

const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /customers/phone/{phone}:
 *   get:
 *     summary: Rechercher un client par téléphone
 *     tags: [Clients]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Client trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Customer' }
 *       404:
 *         description: Client non trouvé
 */
router.get('/phone/:phone', customerController.getByPhone);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Créer un client
 *     tags: [Clients]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CustomerInput' }
 *     responses:
 *       201:
 *         description: Client créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Customer' }
 *       400:
 *         description: Validation échouée
 *       409:
 *         description: Ce numéro de téléphone existe déjà
 */
router.post('/', validateCustomer, validate, customerController.create);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Liste des clients
 *     tags: [Clients]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Customer' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/', authenticate, authorize('Administration', 'Accueil'), customerController.getAll);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Détail d'un client
 *     tags: [Clients]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail du client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Customer' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Client non trouvé
 */
router.get('/:id', authenticate, authorize('Administration', 'Accueil'), customerController.getById);

/**
 * @swagger
 * /customers/{id}/transactions:
 *   get:
 *     summary: Historique de fidélité d'un client
 *     tags: [Clients]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
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
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Client non trouvé
 */
router.get('/:id/transactions', authenticate, authorize('Administration', 'Accueil'), customerController.getTransactions);

/**
 * @swagger
 * /customers/{id}/redeem:
 *   post:
 *     summary: Échanger des points contre une récompense
 *     tags: [Clients]
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
 *           schema: { $ref: '#/components/schemas/CustomerRedeemInput' }
 *     responses:
 *       201:
 *         description: Récompense échangée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction: { $ref: '#/components/schemas/LoyaltyTransaction' }
 *                     reward: { $ref: '#/components/schemas/Reward' }
 *                     points_balance: { type: integer }
 *       400:
 *         description: Récompense indisponible ou solde de points insuffisant
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Client ou récompense non trouvé
 */
router.post('/:id/redeem', authenticate, authorize('Administration', 'Accueil'), validateCustomerRedeem, validate, customerController.redeem);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Modifier un client
 *     tags: [Clients]
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
 *           schema: { $ref: '#/components/schemas/CustomerInput' }
 *     responses:
 *       200:
 *         description: Client modifié
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Client non trouvé
 */
router.put('/:id', authenticate, authorize('Administration', 'Accueil'), validateCustomer, validate, customerController.update);

/**
 * @swagger
 * /customers/{id}/points:
 *   put:
 *     summary: Ajuster manuellement les points d'un client
 *     tags: [Clients]
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
 *           schema: { $ref: '#/components/schemas/CustomerPointsInput' }
 *     responses:
 *       200:
 *         description: Points ajustés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction: { $ref: '#/components/schemas/LoyaltyTransaction' }
 *                     points_balance: { type: integer }
 *       400:
 *         description: Validation échouée ou solde insuffisant
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Client non trouvé
 */
router.put('/:id/points', authenticate, authorize('Administration'), validateCustomerPoints, validate, customerController.updatePoints);

module.exports = router;
