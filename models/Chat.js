const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;