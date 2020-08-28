const User = require('../models/User');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    let username    = req.body.username;
    let password    = req.body.password;
    let date        = req.body.date;

    const account = new Account({
        username: username
    });

    await account.setPassword(password);
    await account.save()

    .then(result => {
        // console.log(result);
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, "someSecret");

        res.json({
            "status" : "success",
            "data": {
                "token": token
            }
        })

        Account.findOne({
            username: username
        }, function(error, u) {

            const user = new User({
                date: date,
                account: {
                    id: u._id,
                    username: u.username 
                }
            })
        
            user.save();
        })

        
    }).catch(error => {
        res.json({
            "status" : "error",
            "data": error
        });
        console.log("error: ", error);
    })
};

const login = async (req, res, next) => {
    const account = await User.authenticate()(req.body.username, req.body.password)
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