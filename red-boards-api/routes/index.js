var express = require('express');
var router = express.Router();



var mongoose = require('mongoose');
var MlsException = mongoose.model('MlsException');
var Comment = mongoose.model('Comment');


// get the iformation from the database before processing request
router.param('id', function(req, res, next, id) {
  var query = MlsException.findById(id);
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






router.get('/mlsexceptions/open', function(req, res) {
  MlsException.find({
    "status": "New"
  }, function(err, mlsExs) {
    if (err) {
      return next(err);
    }

    res.json(mlsExs);
  });
});

router.get('/mlsexceptions/:id', function(req, res) {
  res.json(req.mlsException);
});


router.put('/mlsexceptions', function(req, res, next) {
  console.log("entering update on exception item...")
  var instance = new MlsException(req.body);
  console.log(instance);
  // MlsException.findById(instance._id, function(err, Item) {
  //   if (err) {
  //     console.log(err);
  //     return next(err);
  //   }
  //   Item = instance;
  //   console.log(Item);
  //   Item.save(function(err) {
  //     if (err) {
  //       console.log(err);
  //       return next(err);
  //     }
  //     res.json(Item);
  //   })
  // });

  // this does not return the updated document - ite returns the old version but the document has been updated.
  MlsException.findOneAndUpdate({
      _id: instance._id
    }, instance, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      if (!err) {
        console.log(doc);
        res.json(doc)

      } else {
        console.log(err);
        return next(err);
      }
    }
  );

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