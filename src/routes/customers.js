const express = require('express');
const router = express.Router();

const { validateCustomer, validateCustomerRedeem, validateCustomerPoints } = require('../middlewares/validators/customerValidator');
const validate = require('../middlewares/validate');

const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/phone/:phone', customerController.getByPhone);
router.post('/', validateCustomer, validate, customerController.create);
router.get('/', authenticate, authorize('Administration', 'Accueil'), customerController.getAll);
router.get('/:id', authenticate, authorize('Administration', 'Accueil'), customerController.getById);
router.get('/:id/transactions', authenticate, authorize('Administration', 'Accueil'), customerController.getTransactions);
router.post('/:id/redeem', authenticate, authorize('Administration', 'Accueil'), validateCustomerRedeem, validate, customerController.redeem);
router.put('/:id', authenticate, authorize('Administration', 'Accueil'), validateCustomer, validate, customerController.update);
router.put('/:id/points', authenticate, authorize('Administration'), validateCustomerPoints, validate, customerController.updatePoints);

module.exports = router;
