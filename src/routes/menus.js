const express = require('express');
const router = express.Router();

const { validateMenu } = require('../middlewares/validators/menuValidator');
const validate = require('../middlewares/validate');

const menuController = require('../controllers/menuController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', menuController.getAll);
router.get('/admin', authenticate, authorize('Administration'), menuController.getAllAdmin);
router.get('/:id', menuController.getById);
router.post('/', authenticate, authorize('Administration'), validateMenu, validate, menuController.create);
router.put('/:id', authenticate, authorize('Administration'), validateMenu, validate, menuController.update);
router.delete('/:id', authenticate, authorize('Administration'), menuController.remove);

module.exports = router;