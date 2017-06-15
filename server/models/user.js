const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helpers/util');
let userSchema = new Schema({
  username : {
    type: String,
    required: [true,'{PATH} must be filled'],
    minlength:[5,'{PATH} must be longer than 5 char length'],
    unique: true
  },
  password : {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val) {return val.length >= 5 && val.length <= 20},
      message: '{PATH} must be between 5 and 20 char length'
    }
  },
  articleList : [{type: Schema.Types.ObjectId, ref: 'Article'}]
});

// schema.pre('save', function(next) {
//   // You **must** do `new Error()`. `next('something went wrong')` will
//   // **not** work
//   var err = new Error('something went wrong');
//   next(err);
// });

userSchema.pre('save',function(next)
{
  console.log(this._doc.password)
  this._doc.password = helper.hashPassword(this._doc.password);
  next();
})

let User = mongoose.model('User',userSchema)
module.exports = User;