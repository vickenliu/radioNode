
var mongo = request('mongodb')
var mongoClient= mongo.MongoClient;
var _db;

export module ={
  connect(database) {
    var url = 'mongodb://localhost:27017/'+database
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
    return _db.colletion(colletionName)
  }
}
