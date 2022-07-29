
const mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/SampleDb';
var reviews;
var characteristics;

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server')

  reviews = client.db('reviews').collection('reviewPhotos');
  characteristics = client.db('reviews').collection('mergedCharacteristics');
});


let findReviews = function (productId) {
  console.log('productId', productId);
  // console.log('test query', reviews.find({product_id: productId}))
  return (reviews.find({product_id: productId}).toArray());
}

module.exports.findReviews = findReviews;