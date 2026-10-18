    const express = require('express');
    const router = express.Router();

    const { login } = require('../controllers/authController');

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Connexion (email + mot de passe)
     *     tags: [Auth]
     *     security: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginInput'
     *     responses:
     *       200:
     *         description: Connexion réussie, retourne un JWT
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                     token:
     *                       type: string
     *                     user:
     *                       $ref: '#/components/schemas/User'
     *       401:
     *         description: Email ou mot de passe incorrect
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post('/login', login);

    module.exports = router;
