var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const accountController = require('../controllers/api/v1/c.account.js');
// const birthdayController = require('../controllers/api/v1/c.birthday');



/* GET users listing. */
router.get("/", accountController.getAll);


//GET my birthdate
router.get("/user/:token", accountController.getMyDate);

// GET user ids with same birth date
router.get("/birthday/:date", accountController.getUsersWithSameDate);

// POST user signup
router.post('/signup', authController.signup);

// POST user login
router.post('/login', authController.login);

// GET users with same date of birth
// router.get('/birthday/?date=', authController.saveDate);

// GET users with same date of birth
// router.get('/birthday/:date', birthdayController.getSameDate);


// Logout
// router.get('/logout', authController.logout);

module.exports = router;
