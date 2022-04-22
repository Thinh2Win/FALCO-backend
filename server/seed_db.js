const pool = require('./db.js');

// remember to create an index for product_id column in review table once seeded

// pool.query(`COPY review FROM '/Users/Thinh2Win/Data/reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Reviews table is seeded');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY reviewPhotos FROM '/Users/Thinh2Win/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Photos table is seeded');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristics FROM '/Users/Thinh2Win/Data/characteristics.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristics table is seeded');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristicReviews FROM '/Users/Thinh2Win/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristic reviews table is seeded');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
