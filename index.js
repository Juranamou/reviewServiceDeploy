
const mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/SampleDb';

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server')

  const reviews = client.db('reviews').collection('reviewPhotos');
  const characteristics = client.db('reviews').collection('mergedCharacteristics');
});


