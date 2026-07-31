const express = require('express');
const router = express.Router();

const { validateCustomer } = require('../middlewares/validators/customerValidator');
const validate = require('../middlewares/validate');

const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/phone/:phone', customerController.getByPhone);
router.post('/', validateCustomer, validate, customerController.create);
router.get('/', authenticate, authorize('Administration', 'Accueil'), customerController.getAll);
router.put('/:id', authenticate, authorize('Administration', 'Accueil'), validateCustomer, validate, customerController.update);

module.exports = router;
