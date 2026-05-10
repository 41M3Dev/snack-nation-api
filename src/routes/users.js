const express = require('express');
const router = express.Router();

const { validateUser} = require('../middlewares/validators/userValidator');
const validate = require('../middlewares/validate');

const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');



router.get('/', authenticate, authorize('Administration'), userController.getAllAdmin);
router.get('/email/:email', authenticate, authorize('Administration'), userController.getByEmail);
router.get('/:id', authenticate, authorize('Administration'), userController.getById);
router.post('/',authenticate,authorize('Administration'), validateUser, validate,userController.create);
router.put('/:id',authenticate,authorize('Administration'), validateUser, validate,userController.update);
router.delete('/:id',authenticate,authorize('Administration'),userController.remove);

module.exports = router;