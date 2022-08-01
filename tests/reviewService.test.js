const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('reviews');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const reviews = db.collection('everything');

    const mockReview = {
      "productId": 1,
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
    mockReview.reported = "false";
    mockReview.recommend = mockReview.recommend.toString();
    count = await reviews.count();
    mockReview.date = new Date();
    mockReview._id = count + 1;

    await reviews.insert(mockReview);

    const insertedReview = await reviews.findOne({ _id: mockReview._id});
    expect(insertedReview).toEqual(mockReview);
  });
});

// //
// test('send a post request then get the data', async () => {
//   await axios.post.mockImplementation('/postReview', {
//     "product_id": 1,
//     "rating": 5,
//     "summary": "Ok",
//     "body": "Ok",
//     "recommend": true,
//     "name": "username123",
//     "email": "email@email.com",
//     "photos": ["myspace.com/yumyum123"],
//     "characteristics": {"3": 5, "2": 5, "4": 5, "1": 5}
//     })
//       // .then(() => {return reviews.count();})
//       // .then((id) => {return axios.get(`/reviews/${id}`);})
//       // .then((data) => {console.log(data);})
//   // expect(sum(1, 2)).toBe(3);
// });