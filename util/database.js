const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    process.env.DB_NAME
  )
    .then(client => {
      console.log('Connected!');
      _db=client.db('shop');
     // console.log('Connected!');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No database found!'
}
exports.mongoConnect = mongoConnect;
//module.exports=mongoConnect;
exports.getDb = getDb;


// mongodb+srv://naveenpasham:naveen123@cluster0.tkwfd3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0