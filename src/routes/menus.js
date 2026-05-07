const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', menuController.getAll);
router.get('/admin', authenticate, authorize('Administration'), menuController.getAllAdmin);
router.get('/:id', menuController.getById);
router.post('/', authenticate, authorize('Administration'), menuController.create);
router.put('/:id', authenticate, authorize('Administration'), menuController.update);
router.delete('/:id', authenticate, authorize('Administration'), menuController.remove);

module.exports = router;