var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const accountController = require('../controllers/api/v1/c.account.js');



/* GET users listing. */
router.get("/", accountController.getAll);

// POST user signup
router.post('/signup', authController.signup);

// POST user login
router.post('/login', authController.login);

// Logout
// router.get('/logout', authController.logout);

module.exports = router;
