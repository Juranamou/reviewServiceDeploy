const axios = require('axios');
let db = require('./index.js');

function sum(a, b) {
  return a + b;
}

// sanity check
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

//
test('send a post request then get the data', () => {
  axios.post('/postReview', {
    "product_id": 1,
    "rating": 5,
    "summary": "Ok",
    "body": "Ok",
    "recommend": true,
    "name": "username123",
    "email": "email@email.com",
    "photos": ["myspace.com/yumyum123"],
    "characteristics": {"3": 5, "2": 5, "4": 5, "1": 5}
    })
  // expect(sum(1, 2)).toBe(3);
});