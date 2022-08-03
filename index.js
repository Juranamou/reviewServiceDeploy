const mongo = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');
var url = process.env.URL;
var reviews;

mongo.connect(url, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected successfully to server');
  reviews = client.db(process.env.DB_NAME).collection('everything2');
});


let findReviews = function (productId) {
  return (reviews.find({ productId: productId }).toArray());
}

let buildReviewObject = function (reviewData) {
  let reviewObj = {
    product: reviewData[0].productId,
    results: reviewData
  };
  return reviewObj;
}

let setAvg = function(characteristic, length) {
  if (characteristic) {
    characteristic.value = (characteristic.value / length);
  }
}

let buildMetaObject = function (reviewData) {
  let ratings = {};
  let recommended = {};
  let characteristics = {};
  for (var i = 0; i < reviewData.length; i++) {

    // create characteristics object
    let charArray = reviewData[i].characteristics
    for (var j = 0; j < charArray.length; j++) {
      let type = charArray[j].name;
      if (characteristics[type]) {
        characteristics[type].value = (characteristics[type].value + charArray[j].value);
      } else {
        characteristics[type] = { id: charArray[j].id, value: charArray[j].value };
      }
    }

    // create recommended object
    let recommend = reviewData[i].recommend;
    if (recommended[recommend]) {
      recommended[recommend]++;
    } else {
      recommended[recommend] = 1;
    }

    // create rating object
    let rating = reviewData[i].rating;
    if (ratings[rating]) {
      ratings[rating]++;
    } else {
      ratings[rating] = 1;
    }
  }

  setAvg(characteristics.Quality, reviewData.length);
  setAvg(characteristics.Comfort, reviewData.length);
  setAvg(characteristics.Length, reviewData.length);
  setAvg(characteristics.Fit, reviewData.length);
  setAvg(characteristics.Width, reviewData.length);
  setAvg(characteristics.Size, reviewData.length);

  let metaObj = {
    product_id: reviewData[0].productId,
    ratings: ratings,
    recommended: recommended,
    characteristics: characteristics
  };


  return metaObj;
}

let handlePost = async function(review) {
  // {1:5, 2:5, 3:5} to [{id: 1, value:5}, {id: 2, value: 5}]
  // reformat characteristics:
  let idArray = Object.keys(review.characteristics);
  let newChars = [];
  for (var i = 0; i < idArray.length; i++) {
    let charObj = {};
    charObj['id'] = idArray[i];
    charObj['value'] = review.characteristics[idArray[i]];
    newChars.push(charObj);
  }
  review.characteristics = newChars;
  review.productId = review.product_id;
  review.reported = "false";
  review.recommend = review.recommend.toString();
  review.date = new Date();
  return (reviews.insert(review));
}

let handleHelpful = function(reviewId) {
  return (reviews.findOneAndUpdate({_id: ObjectID(reviewId)}, { $inc: { "helpfulness" : 1 } }))
}

let handleReport = function(reviewId) {
  return (reviews.findOneAndUpdate({_id: ObjectID(reviewId)}, { $set: { "reported" : "true" } }))
}

module.exports.findReviews = findReviews;
module.exports.buildReviewObject = buildReviewObject;
module.exports.buildMetaObject = buildMetaObject;
module.exports.handlePost = handlePost;
module.exports.handleHelpful = handleHelpful;
module.exports.handleReport = handleReport;
module.exports.reviews = reviews;