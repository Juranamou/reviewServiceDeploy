import http from 'k6/http';
import { sleep, check } from 'k6';

// k6 run script.js

// virtual users and duration
export const options = {
  vus: 50,
  duration: '15s',
};

var data = {
  "product_id": 1,
  "rating": 5,
  "summary": "Ok",
  "body": "Ok",
  "recommend": true,
  "name": "username123",
  "email": "email@email.com",
  "photos": ["myspace.com/yumyum123"],
  "characteristics": { "3": 5, "2": 5, "4": 5, "1": 5 }
};

export default function () {

  // let res = http.post('http://localhost:3000/postReview', JSON.stringify(data), {
  //   headers: { 'Content-Type': 'application/json' },
  // });

  let res = http.put('http://localhost:3000/helpful/1');


  // check to see what kind of server response were getting
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
    'transaction time < 500ms': (r) => r.timings.duration < 500,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 100ms': (r) => r.timings.duration < 100
  });
}