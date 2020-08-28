var express = require('express');
var router = express.Router();
// const chatController = require('../../../controllers/api/v1/c.chat')
let birthdayChatController = require('../controllers/api/v1/c.birthday');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
