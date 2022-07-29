
const mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';
var reviews;
var characteristics;

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server');
  reviews = client.db('reviews').collection('everything');
});


let findReviews = function (productId) {
  console.log('productId', productId);
  // console.log('test query', reviews.find({product_id: productId}))
  return (reviews.find({productId: productId}).toArray());
}

let buildReviewObject = function (reviewData) {
  // console.log('review data')
  let reviewObj = {
    product: reviewData[0].productId,
    results: reviewData
  };
  return reviewObj;
}

let buildMetaObject = function (reviewData) {
  console.log('review data', reviewData);
  let metaObj = {
    test: 'test'
  };
  return metaObj;
}

module.exports.findReviews = findReviews;
module.exports.buildReviewObject = buildReviewObject;
module.exports.buildMetaObject = buildMetaObject;