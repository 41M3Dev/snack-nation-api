const express = require('express');
const router = express.Router();

const { validateOrder } = require('../middlewares/validators/orderValidator');
const validate = require('../middlewares/validate');

const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/',validateOrder, validate, orderController.create) ;
router.get('/', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getAll);
router.get('/:id', authenticate, authorize('Administration', 'Préparation', 'Accueil'), orderController.getById);
router.patch('/:id/status', authenticate, authorize('Préparation', 'Accueil'), orderController.updateStatus);

module.exports = router;