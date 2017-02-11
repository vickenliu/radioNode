var express = require('express');
var router = express.Router();
var radios = require('../models/radio')


/* GET home page. */
router.get('/', function(req, res, next) {
  // get radio collections
  radios.model.find().exec(function(err, docs){
    if(err){
      res.sendStatus(400);
    }else{
      console.log('from mongo',docs)
      res.json(docs);
    }
  })
});

module.exports = router;
