var express = require('express');
var router = express.Router();
let userCtrl = require('../controllers/userCtrl');

/* GET users listing. */
router.get('/',userCtrl.getAllUser);
router.get('/:id',userCtrl.getOneUser);
module.exports = router;
