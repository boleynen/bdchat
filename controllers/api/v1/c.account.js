
const Account = require('../../../models/Account');


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






module.exports.getAll = getAll;