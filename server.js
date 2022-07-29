const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
let db = require('./index.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/reviews/:id', (req, res) => {
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildReviewObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500) });
})

app.get('/meta/:id', (req, res) => {
  console.log('meta')
  let prodId = parseInt(req.params.id);
  db.findReviews(prodId)
    .then((data) => { return db.buildMetaObject(data); })
    .then((data) => { res.send(data).status(200) })
    .catch(() => { res.sendStatus(500) });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

