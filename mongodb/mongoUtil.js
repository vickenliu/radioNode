'user strict'

const config = require('../config')();
var mongo = require('mongodb')
var mongoClient= mongo.MongoClient;
var _db;

module.exports ={
  connect(database) {
    var url = config.mongodb + database;
    mongoClient.connect(url, function(err, db){
      if (err) {
        console.log('there is an error connecting to mongodb');
        process.exit(1);
      }else{
        _db = db;
        console.log('Connection established to Mongodb')
      }
    })
  },
  getCollection(colletionName) {
    return _db.collection(colletionName)
  }
}
