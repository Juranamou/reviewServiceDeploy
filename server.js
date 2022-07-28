const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/reviews/:id', (req, res) => {
  res.send('reviews ' + req.params.id + ' count ' + req.query.count + ' sort ' + req.query.sort)

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

