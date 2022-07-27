// Import required module csvtojson and mongodb packages
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const mongodb = require('mongodb');

var url = 'mongodb://localhost:27017/SampleDb';

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

const results = [];
fs.createReadStream(path.join(__dirname,'data/answers.csv'))
  .pipe(csv())
  .on('data', (data) => console.log(data))
  .on('end', () => {
    console.log('complete')
  });