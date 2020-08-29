
const Account = require('../../../models/Account');
const User = require('../../../models/User');
const { json } = require('express');
const jwt = require('jsonwebtoken');

// GET all users
const getAll = (req, res) => {
    Account.find({
    }, (err, docs) => {
        res.json({
            "status": "success",
            "data": {
                "user": docs
            }
        });
    })
}

const getUsersWithSameDate = (req, res) => {
    var urlWithDate = req.url;
    var birthdate = urlWithDate.substring(urlWithDate.lastIndexOf("/") + 1);

    User.find({
        date: birthdate
    }, (err, docs) => {

        if(err){
            res.json({
                "status": "error",
                "data": {
                    "error": err
                }
            })
        }

        return JSON.stringify(docs);

    }).then(docs => {
        let nameIds = [];
        nameId = {};

        docs.forEach(doc => {
            nameId["id"] = doc.account.id
            nameIds.push(nameId.id)
        })

        Account.find().where("_id").in(nameIds).exec((err, users) => {
            if(err){
                res.json({
                    "status": "error",
                    "data": {
                        "error": err
                    }
                })
            }

            let names = [];
            name = {};
            users.forEach(ids =>{
                // console.log(ids.username)
                name["username"] = ids.username
                names.push(name.username)
            })
            res.json({
                "status": "success",
                "data": {
                    "usernames": names
                }
            })
        })
        // res.redirect("/users/" + nameIds)

    }).catch(err => {
        res.json({
            "status": "error",
            "data": {
                "error": err
            }
        })
    })


}


const getMyDate = (req, res) => {

    var urlWithToken = req.url;
    var token = urlWithToken.substring(urlWithToken.lastIndexOf("/") + 1);

    const decodedJwt = jwt.decode(token, { complete: true });
    // console.log(decodedJwt.payload.uid);
    let myId = decodedJwt.payload.uid

    User.find({
        'account.id': myId 
    }, (err, doc) => {
        if(err){
            res.send(err)
        }
        return JSON.stringify(doc);
    }).then(result => {

        res.send(result[0]["date"])

    }).catch(error => {
        res.send(error)
    })
            
    
    
}








module.exports.getAll = getAll;
module.exports.getUsersWithSameDate = getUsersWithSameDate;
module.exports.getMyDate = getMyDate;