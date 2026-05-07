const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');



router.get('/', authenticate, authorize('Administration'), userController.getAllAdmin);
router.get('/email/:email', authenticate, authorize('Administration'), userController.getByEmail);
router.get('/:id', authenticate, authorize('Administration'), userController.getById);
router.post('/',authenticate,authorize('Administration'),userController.create);
router.put('/:id',authenticate,authorize('Administration'),userController.update);
router.delete('/:id',authenticate,authorize('Administration'),userController.remove);

module.exports = router;