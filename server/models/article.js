const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let articleSchema = new Schema({
  title : {
    type: String,
    required: [true,'{PATH} must be filled']
  },
  content : {
    type: String,
    required: [true,'{PATH} must be filled']
  },
  category : {
    type: String,
    lowercase: true,
    required: [true,'{PATH} must be filled'],
    enum: {
      values: ['food','hobby'|'education'],
      message: 'Allowed {PATH} are food|hobby|education'
    }
  },
  _author : {type:Schema.Types.ObjectId, ref:'User'}
});


let Article = mongoose.model('Article',articleSchema);
module.exports = Article