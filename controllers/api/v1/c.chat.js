const Chat = require('../../../models/chat')
const User = require('../../../models/User.js')
const jwt = require('jsonwebtoken');
const { json } = require('express');


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

    User.find({
        'account.id': myId 
    }, (err, doc) => {
        if(err){
            res.send(err)
        }
        return JSON.stringify(doc);
    }).then(result => {

        let chat = new Chat({
            message: req.body.message,
            user: myUsername,
            chatroom: result[0]["date"]
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

    }).catch(error => {
        res.send(error)
    }) 

    
}

const getChatsFromYourChatroom = (req, res, next) => {

    var urlWithDate = req.url;
    var birthdate = urlWithDate.substring(urlWithDate.lastIndexOf("/") + 1);

    Chat.find({
    }, (err, chats) => {

        let chatsArr = [];
        let c = {};

        chats.forEach(chat => {
            c["chatroom"] = chat.chatroom
            let chatroom = JSON.stringify(chat.chatroom);
            chatroom = chatroom.substring(1,11);
            // console.log("chatroom: "+ chatroom + " type: "+ typeof(chatroom))
            if(chatroom === birthdate){
                chatsArr.push(chat)
            }
            // console.log(chatsArr);
        })

        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }

        res.json({
            "status": "success",
            "data": {
                "chat": chatsArr
            }
        })
    })
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getChatsFromYourChatroom = getChatsFromYourChatroom;