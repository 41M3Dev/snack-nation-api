const express = require('express');
const router = express.Router();

const { validateLoyaltyTransaction } = require('../middlewares/validators/loyaltyTransactionValidator');
const validate = require('../middlewares/validate');

const loyaltyTransactionController = require('../controllers/loyaltyTransactionController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', authenticate, authorize('Administration'), loyaltyTransactionController.getAll);
router.get('/customer/:customerId', authenticate, loyaltyTransactionController.getByCustomer);
router.post('/', authenticate, authorize('Administration'), validateLoyaltyTransaction, validate, loyaltyTransactionController.create);

module.exports = router;
