var express = require('express');
var router = express.Router();
let loginCtrl = require('../controllers/loginCtrl')

/* GET home page. */
router.post('/login', loginCtrl.login);
router.post('/register',loginCtrl.register);

module.exports = router;
