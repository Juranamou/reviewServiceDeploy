const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
// let db = require('./index.js');
const mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/reviews';
app.use(express.static(path.join(__dirname, 'public')));

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server')
  const reviews = client.db('reviews').collection('reviewPhotos');
  console.log('reviews', reviews);
  // const characteristics = client.db('reviews').collection('mergedCharacteristics');

  app.get('/reviews/:id', (req, res) => {
    let prodId = parseInt(req.params.id);
    console.log('param', typeof req.params.id);
    reviews.find({ product_id: prodId }).toArray((err, docs) => {
      console.log('params inside find', req.params.id);
      if (err) {
        res.send(err);
      } else {
        res.send(docs);
      }
    })
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

