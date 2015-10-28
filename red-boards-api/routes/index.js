var express = require('express');
var router = express.Router();



var mongoose = require('mongoose');
var MlsException = mongoose.model('MlsException');
var Comment = mongoose.model('Comment');


// get the iformation from the database before processing request
router.param('mlsexception', function(req, res, next, id) {
  var query = MlsException.findById(id);

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

router.param('Comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('can\'t find the comment'));
    }

    req.comment = comment;
    return next();
  });
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get('/mlsexceptions', function(req, res, next) {
  MlsException.find(function(err, mlsExs) {
    if (err) {
      return next(err);
    }

    res.json(mlsExs);
  });
});

router.post('/mlsexceptions', function(req, res, next) {
  var mls = new MlsException(req.body);
  mls.save(function(err, obj) {
    if (err) {
      return next(err);
    }

    res.json(obj);
  });
});

router.get('/mlsexceptions/:mlsexception', function(req, res) {
  req.mlsExceptions.populate('comments', function(err, obj) {
    if (err) {
      return next(err);
    }

    res.json(obj);
  });
});


router.post('/mlsexceptions/:mlsexception/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.parentObj = req.mlsException;

  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }

    req.mlsException.comments.push(comment);
    req.mlsException.save(function(err, obj) {
      if (err) {
        return next(err);
      }

      res.json(comment);
    });
  });
});




module.exports = router;