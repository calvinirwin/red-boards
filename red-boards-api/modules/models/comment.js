var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  create_date: Date,
  syncfail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MlsException'
  }
});

mongoose.model('Comment', CommentSchema);