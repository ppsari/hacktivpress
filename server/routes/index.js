var express = require('express');
var router = express.Router();
let loginCtrl = require('../controllers/loginCtrl')

/* GET home page. */
router.post('/login', loginCtrl.login); //v
router.post('/register',loginCtrl.register); //v
router.post('/',loginCtrl.token);

module.exports = router;
