const Chat = require('../../../models/chat')


// GET all chats
const getAll = (req, res) => {
    Chat.find({
    }, (err, docs) => {
        res.json({
            "status": "success",
            "data": {
                "chat": docs
            }
        });
    })
    
}

// POST chat
const create = (req, res, next) => {
    console.log(req.body);
    let chat = new Chat();
    
    chat.message = req.body.message;
    chat.user = req.body.user;

    chat.save((err, doc) => {
        if(err){
            res.json({
                "status": "error",
                "message": "Could not save message: " + err
            })
        }
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "data": doc
                }
            })
        }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;