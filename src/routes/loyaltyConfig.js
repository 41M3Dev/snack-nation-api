const express = require('express');
const router = express.Router();

const { validateLoyaltyConfig } = require('../middlewares/validators/loyaltyConfigValidator');
const validate = require('../middlewares/validate');

const loyaltyConfigController = require('../controllers/loyaltyConfigController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', loyaltyConfigController.getAll);
router.get('/:key', loyaltyConfigController.getByKey);
router.put('/:key', authenticate, authorize('Administration'), validateLoyaltyConfig, validate, loyaltyConfigController.update);

module.exports = router;
