var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var MlsException = mongoose.model('MlsException');
// var Comment = mongoose.model('Comment');


module.exports = function(app, service) {


  // get the iformation from the database before processing request
  app.param('id', function(req, res, next, id) {
    var query = service.findById(id);
    console.log("logging:" + id);
    query.exec(function(err, exceptionObj) {
      if (err) {
        return next(err);
      }
      if (!exceptionObj) {
        return next(new Error('can\'t find object'));
      }

      req.mlsException = exceptionObj;
      return next();
    });
  });

  // app.param('Comment', function(req, res, next, id) {
  //   var query = Comment.findById(id);
  //
  //   query.exec(function(err, comment) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!comment) {
  //       return next(new Error('can\'t find the comment'));
  //     }
  //
  //     req.comment = comment;
  //     return next();
  //   });
  // });

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  });


  app.get('/mlsexceptions', function(req, res, next) {
    console.log("GET- > all ");
    service.all(1, 100, function(err, mlsExs) {
      if (err) {
        return next(err);
      }

      res.json(mlsExs);
    });
  });

  app.post('/mlsexceptions', function(req, res, next) {
    console.log("POST- > ");
    service.create(req.body, function(err, obj) {
      if (err) {
        return next(err);
      }

      res.json(obj);
    });
  });

  app.get('/mlsexceptions/open', function(req, res) {
    service.find({
      "status": "New"
    }, 1, 100, function(err, mlsExs) {
      if (err) {
        return next(err);
      }

      res.json(mlsExs);
    });
  });

  app.get('/mlsexceptions/:id', function(req, res) {
    res.json(req.mlsException);
  });


  app.put('/mlsexceptions', function(req, res, next) {
    console.log("entering update on exception item...")
    var instance = new MlsException(req.body);
    console.log(instance);

    service.update(req.body._id, req.body, function(err, doc) {
      if (!err) {
        //console.log(doc);
        res.json(doc)

      } else {
        console.log(err);
        return next(err);
      }
    });

  });

  // app.post('/mlsexceptions/:mlsexception/comments', function(req, res, next) {
  //   var comment = new Comment(req.body);
  //   comment.parentObj = req.mlsException;
  //
  //   comment.save(function(err, comment) {
  //     if (err) {
  //       return next(err);
  //     }
  //
  //     req.mlsException.comments.push(comment);
  //     req.mlsException.save(function(err, obj) {
  //       if (err) {
  //         return next(err);
  //       }
  //
  //       res.json(comment);
  //     });
  //   });
  // });


};

// module.exports = router;