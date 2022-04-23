const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
pool.on('error', (err) => {
  console.log('pool error', err);
});

pool.connect();

const reviewQuery = `CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INT,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT
);`;

const photosQuery = `CREATE TABLE IF NOT EXISTS reviewPhotos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES review
);`;

const characteristicsQuery = `CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT
);`;

const charReviewsQuery = `CREATE TABLE IF NOT EXISTS characteristicReviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES review,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics
);`;

// pool.query(reviewQuery)
//   .then((res) => {
//     console.log('Review table is created');
//     pool.query(characteristicsQuery)
//       .then((res) => {
//         console.log('Characteristics table is created');
//         pool.query(photosQuery)
//           .then((res) => {
//             console.log('Photo table is created');
//             pool.query(charReviewsQuery)
//               .then((res) => {
//                 console.log('Characteristic reviews table is created');
//               });
//           });
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = pool;
