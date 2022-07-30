
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
  return (reviews.find({productId: productId}).toArray());
}

let buildReviewObject = function (reviewData) {
  let reviewObj = {
    product: reviewData[0].productId,
    results: reviewData
  };
  return reviewObj;
}

let buildMetaObject = function (reviewData) {
  console.log('review data', reviewData);
  let ratings = {};
  for (var i = 0; i < reviewData.length; i++) {
    let rating = reviewData[i].rating;
    console.log('ratings!!', rating);
    if(ratings[rating]) {
      ratings[rating]++;
    } else {
      ratings[rating] = 1;
    }
  }

  let metaObj = {
    ratings: ratings
  };
  return metaObj;
}

module.exports.findReviews = findReviews;
module.exports.buildReviewObject = buildReviewObject;
module.exports.buildMetaObject = buildMetaObject;