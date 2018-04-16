var express = require('express');
var router = express.Router();
var Radio = require('../models/radio').model;


/* GET home page. */
router.get('/', function(req, res, next) {
  // get radio collections
  Radio.find().exec(function(err, docs){
    if(err){
      res.sendStatus(400);
    }else{
      console.log('from mongo',docs)
      res.json(docs);
    }
  })
});

module.exports = router;
