const express = require('express');
const router = express.Router();

const { validateProduct } = require('../middlewares/validators/productValidator');
const validate = require('../middlewares/validate');

const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Liste des produits disponibles
 *     tags: [Produits]
 *     security: []
 *     responses:
 *       200:
 *         description: Liste des produits disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/admin/:
 *   get:
 *     summary: Liste complète des produits (admin)
 *     tags: [Produits]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste complète des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.get('/admin/', authenticate, authorize('Administration'), productController.getAllAdmins);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Détail d'un produit
 *     tags: [Produits]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Détail du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Produit non trouvé
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products/admin/:
 *   post:
 *     summary: Créer un produit
 *     tags: [Produits]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProductInput' }
 *     responses:
 *       201:
 *         description: Produit créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       400:
 *         description: Validation échouée
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 */
router.post('/admin/', authenticate, authorize('Administration'), validateProduct, validate, productController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
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
 *           schema: { $ref: '#/components/schemas/ProductInput' }
 *     responses:
 *       200:
 *         description: Produit modifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       400:
 *         description: Validation échouée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Produit non trouvé
 */
router.put('/:id', authenticate, authorize('Administration'), validateProduct, validate, productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Produit supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Produit non trouvé
 */
router.delete('/:id', authenticate, authorize('Administration'), productController.remove);

module.exports = router;
