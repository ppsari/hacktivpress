let User = require('../models/user');
let helper = require('../helpers/util');

const login = (req,res) => {
  res.send('ba')
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
  register
}