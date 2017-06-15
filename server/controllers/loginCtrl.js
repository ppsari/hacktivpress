let User = require('../models/user');
let helper = require('../helpers/util');

const token = (req,res) => {
  let user = helper.getUserDetail(`${req.body.token}`);
  console.log(user.err)
  console.log(user);
  if (user.hasOwnProperty('error')) res.send({err:user.error});
  else res.send(user);
  
}

const login = (req,res) => {
  if (typeof req.body.username === '') res.send({err:'Username must be filled'});
  else if (typeof req.body.password === '') res.send({err:'Password must be filled'});
  else {
    User.findOne({username:req.body.username},(err,user)=>{
      if (err) res.send({err:'Invalid username/password'})
      else if (!helper.checkPass(req.body.password,user.password)) res.send({err:'Invalid username/password'})
      else {
        let userDt = {username:user.username,_id:user._id}
        res.send({token: helper.createToken(userDt)})
      }
    })
  }
}


const register = (req,res,next) => {
  let user = new User(req.body);
  user.save((err,user)=>{
    if (err) {
      let err_msg = '';
      for (let key in err.errors) err_msg+= err.errors[key]+'\n';
      if (typeof err.code !== 'undefined')
        if (err.code == '11000') err_msg+= 'Duplicate Username';

      res.send({err:err_msg});
    } else {
      res.send(user);
    }
  })
}
module.exports = {
  login,
  register,
  token
}