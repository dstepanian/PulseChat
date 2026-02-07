const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app';
  return mongoose.connect(uri);
};

module.exports = connectDB;