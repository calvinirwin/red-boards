var os = require('os');
var express = require('express');
var bodyParser = require('body-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var config = require('./config');

//var mongoose = require('mongoose');

//require('./models/MlsException');
//require('./models/Comment');

//smongoose.connect('mongodb://localhost/mls_exceptions');

//var routes = require('./routes/rb-routes');
//var users = require('./routes/users');

var app = express();


var RbService = require('./modules/rb-service');
var svc = new RbService(config);

svc.start();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', config.web.port);
app.set('etag', false);

//app.use(logger('dev'));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('Registering routes...')
require('./routes/rb-routes.js')(app, svc);



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });






app.listen(app.get('port'), config.web.host, function() {
  console.log('red-board api server listening on port ' + config.web.port);
});

process.on('SIGINT', function() {
  console.log('red-board api server on ' + os.hostname() + ' is stopping...');
  svc.stop(function() {
    console.log('red-board api server on ' + os.hostname() + ' disconnected from database.');
    process.exit(0);
  });
});