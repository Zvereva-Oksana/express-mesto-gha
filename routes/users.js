const router = require('express').Router();

const {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  meIdValidation, userIdValidation,
  updateUserValidation, updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', meIdValidation, getCurrentUser);
router.get('/:userId', userIdValidation, getUserByID);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
