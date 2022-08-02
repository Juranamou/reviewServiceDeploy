const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
let db = require('./index.js');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('52.90.187.39/reviews/:id', (req, res) => {
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildReviewObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500) });
})

app.get('52.90.187.39/meta/:id', (req, res) => {
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildMetaObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500) });
})

app.post('52.90.187.39/postReview', (req, res) => {
  db.handlePost(req.body)
    .then(() => {res.send('goodgood').status(200)})
    .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.put('52.90.187.39/helpful/:reviewId', (req, res) => {
  let reviewId = req.params.reviewId;
  db.handleHelpful(reviewId)
  .then(() => {res.send('goodgood').status(200)})
  .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.put('52.90.187.39/report/:reviewId', (req, res) => {
  let reviewId = req.params.reviewId;
  db.handleReport(reviewId)
  .then(() => {res.send('goodgood').status(200)})
  .catch((err) => {res.send('badbad').status(); console.log(err)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

