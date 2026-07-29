const express = require('express');
const router = express.Router();

const { validateReward } = require('../middlewares/validators/rewardValidator');
const validate = require('../middlewares/validate');

const rewardController = require('../controllers/rewardController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', rewardController.getAll);
router.get('/admin/', authenticate, authorize('Administration'), rewardController.getAllAdmins);
router.get('/:id', rewardController.getById);
router.post('/admin/', authenticate, authorize('Administration'), validateReward, validate, rewardController.create);
router.put('/:id', authenticate, authorize('Administration'), validateReward, validate, rewardController.update);
router.delete('/:id', authenticate, authorize('Administration'), rewardController.remove);

module.exports = router;
