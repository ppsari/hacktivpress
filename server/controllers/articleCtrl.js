let User = require('../models/user');
let Article = require('../models/article');
let helper = require('../helpers/util')
const getAllArticle = (req,res) => {
  Article.find({},(err,articles)=>{
    res.send(err? {err:err} : articles)
  })
}
const getOneArticle = (req,res) => {
  Article.findById(req.params.id, (err,article) => {
    res.send(err? {err:err} : article)
  })
}
const updateArticle = (req,res) => {
  if (typeof req.headers.token === 'undefined') res.send({err:'You must login'})
  else {
    Article.findById(req.params.id, (err,article) => {
      if (err) res.send({ err: 'Invalid article'});
      else {
        let decoded = helper.getUserDetail(req.headers.token);
        console.log(decoded);
        if (typeof decoded._id === 'undefined') res.send({err:'Invalid UserId'})
        else if (decoded._id != article._author) res.send({err:'Invalid User'})
        else {
          for(let key in req.body) article[key] = req.body[key];
          article.save((err,article)=>{
            if (err) {
              let err_msg = '';
              for (let key in err.errors) err_msg+= err.errors[key]+'\n';
              res.send({err:err_msg});
            }
            else res.send(article)
          })
        }
      }
    })
  }

}
const deleteArticle = (req,res) => {
  if (typeof req.headers.token === 'undefined') res.send({err:'You must login'})
  else {
    Article.findById(req.params.id, (err,article) => {
      if (err) res.send({ err: 'Invalid article'});
      else {
        let decoded = helper.getUserDetail(req.headers.token);
        console.log(decoded);
        if (typeof decoded._id === 'undefined') res.send({err:'Invalid UserId'})
        else if (decoded._id != article._author) res.send({err:'Invalid User'})
        else
          article.remove((err,article)=>{res.send(err? {err:err} : articles)})
      }
    })
  }
}
const createArticle = (req,res) => {
  if (typeof req.headers.token === 'undefined') res.send({err:'You must login'})
  else {

    let decoded = helper.getUserDetail(req.headers.token);
    console.log(decoded);
    if (typeof decoded._id === 'undefined') res.send({err:'Invalid UserId'})
    else {
      User.findById(decoded._id, (err,user)=>{
        if (err) res.send({err:'Invalid UserId'})
        else {
          let article = new Article(req.body);
          article.save((err,article)=>{
            if (err) {
              let err_msg = '';
              for (let key in err.errors) err_msg+= err.errors[key]+'\n';
              res.send({err:err_msg});
            } else {
              // res.send(user);
              user.articleList.push(article._id);
              user.save((err,user)=> {res.send(err? {err:err} : article)})
            }
          })

        }
      })
    }
    // else if (decoded._id != article._author) res.send({err:'Invalid User'})
    // else {
    //   for(let key in req.body) article[key] = req.body[key];
    //   article.save((err,article)=>{
    //     if (err) {
    //       let err_msg = '';
    //       for (let key in err.errors) err_msg+= err.errors[key]+'\n';
    //       res.send({err:err_msg});
    //     }
    //     else res.send(article)
    //   })
    // }

  }
}
const getUserArticle = (req,res) => {
  Article.find({_author: req.params.user},(err,articles)=>{
    res.send(err? {err:err} : articles)
  })
}
const getCategoryArticle = (req,res) => {
  Article.find({category: req.params.cat},(err,articles)=>{
    res.send(err? {err:err} : articles)
  })
}

module.exports = {
  getAllArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
  createArticle,
  getUserArticle,
  getCategoryArticle
}


