const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');
const { updateProfile } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
