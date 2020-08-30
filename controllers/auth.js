const User = require('../models/User');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    let username    = req.body.username;
    let password    = req.body.password;
    let date        = req.body.date;

    const registeredUsernames = Account.find({
        username: username
    });

    if((await registeredUsernames).length > 0){
        res.json({
            "status": "error_username",
            "message": "Username already taken!"
        })
    }else if((await registeredUsernames).length <= 0){
        const account = new Account({
            username: username
        });

        await account.setPassword(password);
        await account.save()

        .then(result => {

            let token = jwt.sign({
                uid: result._id,
                username: result.username
            }, "someSecret")

            const user = new User({
                date: date,
                account: {
                    id: result._id,
                }
            })

            user.save();

                
            res.json({
                "status" : "success",
                "data": {
                    "date": date,
                    "token": token
                }
            })
            
            
        }).catch(error => {
            res.json({
                "status" : "error",
                "message": error
            });
        })

        
    }

};


const login = async (req, res, next) => {
    const account = await Account.authenticate()(req.body.username, req.body.password)
    .then(result => {
        if(!result.user){
            return res.json({
                "status": "failed",
                "message": "login failed"
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, "someSecret");

        return res.json({
            "status" : "success",
            "data" : {
                "token" : token
            }
        });
        


    }).catch(error => {
        res.json({
            "status" : "error",
            "message" : error
        });
    })
}

module.exports.signup = signup;
module.exports.login = login;