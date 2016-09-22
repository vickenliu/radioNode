var express = require('express');
var router = express.Router();
var mongo = require('../mongodb/mongoUtil')

// establish connection to mongodb
mongo.connect('radio');

/* GET home page. */
router.get('/', function(req, res, next) {
  // get radio collections
  var collections = mongo.getCollection('radio')

  collections.find().toArray(function(err, docs){
    if(err){
      res.sendStatus(400);
    }else{
      console.log('from mongo',docs)
      res.json(docs);
    }
  })
});

module.exports = router;
