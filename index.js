const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/SampleDb';
const dbName = 'reviews'

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const reviewColl = db.collection('reviews');

})


