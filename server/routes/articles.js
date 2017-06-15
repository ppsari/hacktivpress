var express = require('express');
var router = express.Router();
let articleCtrl = require('../controllers/articleCtrl');

/* GET articles listing. */
router.get('/',articleCtrl.getAllArticle); //
router.get('/:id',articleCtrl.getOneArticle); //
router.put('/:id',articleCtrl.updateArticle); //
router.delete('/:id',articleCtrl.deleteArticle); //
router.post('/',articleCtrl.createArticle); //
router.get('/user/:user',articleCtrl.getUserArticle); //
router.get('/category/:cat',articleCtrl.getCategoryArticle); //
module.exports = router;
