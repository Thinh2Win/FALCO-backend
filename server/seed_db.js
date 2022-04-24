const pool = require('./db.js');

// run 1st 2 seed queries first than 3 than 4

// pool.query(`COPY review FROM '/Users/Thinh2Win/Data/reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Reviews table is seeded');
//     pool.query(`CREATE INDEX product_id_index ON review (product_id);`)
//       .then(() => {
//         console.log('product_id indexed for review table');
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristics FROM '/Users/Thinh2Win/Data/characteristics.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristics table is seeded');
//     pool.query(`CREATE INDEX char_product_id_index ON characteristics (product_id);`)
//       .then(() => {
//         console.log('product_id indexed for characteristic table');
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY reviewPhotos FROM '/Users/Thinh2Win/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Photos table is seeded');
//     pool.query(`CREATE INDEX review_id_index ON reviewphotos (review_id);`)
//       .then(() => {
//         console.log('review_id indexed for reviewphotos table');
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.query(`COPY characteristicReviews FROM '/Users/Thinh2Win/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;`)
//   .then(() => {
//     console.log('Characteristic reviews table is seeded');
//     pool.query(`CREATE INDEX review_id_charecteristic_id_index ON characteristicreviews (characteristic_id, review_id);`)
//       .then(() => {
//         console.log('review_id and characteristic_id indexed for review table');
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
