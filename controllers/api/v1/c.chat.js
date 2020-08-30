const Chat = require('../../../models/chat')
const jwt = require('jsonwebtoken');


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
    console.log(req.headers.authorization);
    let bearer = req.headers.authorization;

    var token = bearer.substring(bearer.lastIndexOf(" ") + 1);
    
    const decodedJwt = jwt.decode(token, { complete: true });
    let myUsername = decodedJwt.payload.username
    let myId = decodedJwt.payload.uid

    let chat = new Chat({
        message: req.body.message,
        user: myUsername
    })

    chat.save((err, doc) => {
        if(err){
            res.json({
                "status": "error",
                "message": "Could not save message: " + err
            })
        }
        
        res.json({
            "status": "success",
            "data": {
                "chat": doc
            }
        })
        
    });
}

const getChatsFromYourChatroom = (req, res, next) => {
    Chat.find({
    }, (err, chats) => {
        
    })
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getChatsFromYourChatroom = getChatsFromYourChatroom;