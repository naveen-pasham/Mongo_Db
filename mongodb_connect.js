// mongodb connection

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    process.env.DB_NAME
  )
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No database found!'
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
