const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    chatroom: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;