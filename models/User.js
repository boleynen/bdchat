const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    date: { 
        type: Date,
        required: true
    },
    account: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Account",
           required: true
        }
     }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);