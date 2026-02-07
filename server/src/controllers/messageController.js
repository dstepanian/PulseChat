const Message = require('../models/Message');

const getRoomMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { content, room } = req.body;

    const message = new Message({
      content,
      room,
      sender: req.userId
    });

    const savedMessage = await message.save();
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('sender', 'username');

    return res.status(201).json(populatedMessage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoomMessages,
  createMessage
};