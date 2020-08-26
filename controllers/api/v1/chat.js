const Chat = require('../../../models/chat')

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

const create = (req, res, next) => {
    // console.log(req.body);
    let chat = new Chat();
    chat.message = req.body.message;
    chat.username = req.body.username;
    chat.save((err, doc) => {
        if(err){
            res.json({
                "status": "error",
                "message": "Could not save message"
            })
        }
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