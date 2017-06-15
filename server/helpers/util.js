const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

require('dotenv').config;

const hashPassword = (plainpass) => {
  return crypto.AES.encrypt(plainpass,process.env.SECRET_KEY)
}

const checkPass = (plainpass,pass) => {
  let bytepass = crypto.AES.decrypt(pass.toString(),process.env.SECRET_KEY);
  return plainpass === bytepass.toString(crypto.enc.Utf8);
}
const createToken = (user) => {
  return jwt.sign(user,process.env.SECRET_KEY, {expiresIn: 60*60})
}

const getUserDetail = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
}


module.export = {
  checkPass,
  hashPassword,
  createToken,
  getUserDetail
}