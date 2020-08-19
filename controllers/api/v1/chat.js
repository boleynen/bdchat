const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    message: String,
    user: String
});

const Chat = mongoose.model('Chat', chatSchema);

const getAll = (req, res) => {
    Chat.find({
        "user": "Bo"
    }, (err, docs) => {
        res.json({
            "status": "success",
            "data": {
                "chat": docs
            }
        });
    })
    
}

const create = (req, res) => {
    let chat = new Chat();
    chat.message = "Hey, nice to meet you !";
    chat.user = "Bo"
    chat.save((err, doc) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "message": doc
                }
            })
            
        }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;