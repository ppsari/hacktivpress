var express = require('express');
var router = express.Router();
let articleCtrl = require('../controllers/articleCtrl');

/* GET articles listing. */
router.get('/',articleCtrl.getAllArticle); //v
router.get('/:id',articleCtrl.getOneArticle); //vv
router.put('/:id',articleCtrl.updateArticle); //v
router.delete('/:id',articleCtrl.deleteArticle); //v
router.post('/',articleCtrl.createArticle); //v
router.get('/user/:user',articleCtrl.getUserArticle); //v
router.get('/category/:cat',articleCtrl.getCategoryArticle); //v
module.exports = router;
