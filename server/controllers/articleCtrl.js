let User = require('../models/user');
let Article = require('../models/article');
let helper = require('../helpers/util')
const getAllArticle = (req,res) => {
  Article.find({})
  .populate('_author')
  .exec((err,articles)=>{
    res.send(err? {err:err} : articles)
  });
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
          article.remove((err,article)=>{res.send(err? {err:err} : article)})
      }
    })
  }
}
// const updateUser = (res,article_id,user_id)=> {
//   User.findById(user_id, (err_find,user)=>{
//     if (err_find) res.send({err:'Failed to find user'});
//     else {
//       let idx = user.articleList.findIndex(article=> article_id == article)
//       // console.log(idx)
//       if (idx === -1) user.articleList.push(`${article_id}`);
//       console.log(user);
//       user.save((err_user,u_user)=> {
//         // console.log(u_user);
//         // console.log(err_user)
//         res.send(err? {err:err_user} : `${article_id} INSERTED`)
//       })
//     }
//   })
// }

const createArticle = (req,res) => {
  if (typeof req.headers.token === 'undefined') res.send({err:'You must login'})
  else {

    let decoded = helper.getUserDetail(req.headers.token);
    // console.log(decoded);
    if (typeof decoded._id === 'undefined') res.send({err:'Invalid UserId'})
    else {
      User.findById(decoded._id, (err,user)=>{
        if (err) res.send({err:'Invalid UserId'})
        else {
          let article = new Article(req.body);
          article._author = user._id;
          article.save((err_arti,article)=>{
            if (err) {
              // console.log(err_arti);
              let err_msg = '';
              for (let key in err.errors) err_msg+= err_arti.errors[key]+'\n';
              res.send({err:err_msg});
            } else
              // updateUser(res,article._id,user._id);
              if (typeof article._id !== 'undefined') {
                let idx = user.articleList.findIndex((article)=> article == article._id );
                if (idx > -1) user.articleList.push(`${article._id}`);
                user.save((err_u,userup)=> {
                  res.send(err? {err:err_u} : article)
                })

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
  Article.find({_author: req.params.user})
  .populate('_author')
  .exec((err,articles)=>{
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


