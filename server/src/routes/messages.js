const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const {
  getRoomMessages,
  createMessage
} = require('../controllers/messageController');

router.get('/:roomId', verifyToken, getRoomMessages);
router.post('/', verifyToken, createMessage);

module.exports = router;
