const User = require('../models/User');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    let username    = req.body.username;
    let password    = req.body.password;
    let date        = req.body.date;

    const user = new User({
        username: username,
        date: date
    });

    await user.setPassword(password);
    await user.save()
    .then(result => {
        console.log(token);
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
    }).catch(error => {
        res.json({
            "status" : "error"
        })
    })
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password)
    .then(result => {
        res.json({
            "status" : "success",
            "data" : {
                "user" : result
            }
        });
        // window.location.replace("index.html");
        if (status.status == "success"){
            window.location.href = "index.html";
          }
          else{
            alert("error occured");
          }
    }).catch(error => {
        res.json({
            "status" : "error",
            "message" : error
        });
    })
}

module.exports.signup = signup;
module.exports.login = login;