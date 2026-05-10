const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', orderController.create);
router.get('/', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getAll);
router.get('/:id', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getById);
router.patch('/:id/status', authenticate, authorize('Préparation', 'Accueil'), orderController.updateStatus);

module.exports = router;