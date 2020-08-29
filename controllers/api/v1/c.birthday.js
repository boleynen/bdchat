// const User = require('../../../models/User');


// const getSameDate = (req, res) => {
//     let userId = req.user._id;
//     User.findOne({ 
//         "account.id": userId 
//     }, (err, foundedUser) => {
//         if (err) {
//             res.sendr(err);
//         }
//         let currentUser = foundedUser;
//         let birthdate = foundedUser.dateofbirth;
//         // find users born the same date
//         User.find({ 
//             dateofbirth: birthdate , 
//             "account.id" : { 
//                 $ne: userId 
//             }}, 
//             function (err, foundedUsers) {
//             if (err) {
//                 res.send(err);
//             }
//             //count users
//             let countedUsers = foundedUsers.length;
//             let userData = { 
//                 username:currentUser.account._id}
                
//             res.render('profile', { 
//                 nUsers: countedUsers, 
//                 users: foundedUser,  
//                 currentUser: userData 
//             });
//         });
//     });

// }

// module.exports.getSameDate = getSameDate;