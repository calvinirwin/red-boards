var mongoose = require('mongoose');


var MlsExceptionSchema = new mongoose.Schema({
  mls_area: String,
  client_code: String,
  client_name: String,
  last_run: Date,
  host_server: String,
  create_date: Date,
  //author: String,
  body: String,
  exception_type: String,
  status: String,
  modified_by: String,
  modified_date: Date,
  cause: String,
  ticket_num: String,
  action_taken: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});


mongoose.model('MlsException', MlsExceptionSchema);