const express = require('express');
const router = express.Router();

const { validateOrder } = require('../middlewares/validators/orderValidator');
const validate = require('../middlewares/validate');

const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Créer une commande (borne)
 *     tags: [Commandes]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/OrderInput' }
 *     responses:
 *       201:
 *         description: Commande créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: integer }
 *                     order_number: { type: string }
 *                     points_earned: { type: integer }
 *                     new_balance: { type: integer, nullable: true }
 *       400:
 *         description: Validation échouée
 *       404:
 *         description: Produit ou menu non trouvé
 */
router.post('/', validateOrder, validate, orderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Liste des commandes
 *     tags: [Commandes]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Order' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Détail d'une commande
 *     tags: [Commandes]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail de la commande (avec lignes produits et menus)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Order' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Commande non trouvée
 */
router.get('/:id', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getById);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'une commande
 *     tags: [Commandes]
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
 *           schema: { $ref: '#/components/schemas/OrderStatusInput' }
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Order' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Commande non trouvée
 */
router.patch('/:id/status', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.updateStatus);

module.exports = router;
