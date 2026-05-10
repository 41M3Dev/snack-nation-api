const express = require('express');
const router = express.Router();

const { validateProduct } = require('../middlewares/validators/productValidator');
const validate = require('../middlewares/validate');

const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', productController.getAll);
router.get('/admin/', authenticate, authorize('Administration'), productController.getAllAdmins);
router.get('/:id', productController.getById);
router.post('/admin/', authenticate, authorize('Administration'), validateProduct, validate, productController.create);
router.put('/:id', authenticate, authorize('Administration'), validateProduct, validate, productController.update);
router.delete('/:id', authenticate, authorize('Administration'), productController.remove);

module.exports = router;