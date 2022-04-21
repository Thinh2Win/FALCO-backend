const pool = require('./db.js');

// pool.query(`COPY review (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/Thinh2Win/Data/reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Reviews table is seeded');
//     pool.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY reviewPhotos (id, review_id, url) FROM '/Users/Thinh2Win/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Photos table is seeded');
//     pool.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristics (id, product_id, name) FROM '/Users/Thinh2Win/Data/characteristics.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristics table is seeded');
//     pool.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristicReviews (id, characteristic_id, review_id, value) FROM '/Users/Thinh2Win/Data/reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristic reviews table is seeded');
//     pool.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
