const { Pool, Client } = require('pg');
require('dotenv').config();

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: '',
//   port: process.env.DB_PORT,
// });
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
  id INT NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INT,
  date BIGINT,
  summary varchar(500),
  body varchar(500),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name varchar(50),
  reviewer_email varchar(50),
  response varchar(500),
  helpfulness INT
);`;

const photosQuery = `CREATE TABLE IF NOT EXISTS reviewPhotos (
  id INT NOT NULL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url varchar(200)
);`;

const characteristicsQuery = `CREATE TABLE IF NOT EXISTS characteristics (
  id INT NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name varchar(50)
);`;

const charReviewsQuery = `CREATE TABLE IF NOT EXISTS characteristicReviews (
  id INT NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL
);`;

pool.query(reviewQuery)
  .then((res) => {
    console.log('Review table is created');
  })
  .catch((err) => {
    console.log(err);
  });

pool.query(photosQuery)
  .then((res) => {
    console.log('Photo table is created');
  })
  .catch((err) => {
    console.log(err);
  });

pool.query(characteristicsQuery)
  .then((res) => {
    console.log('Characteristics table is created');
  })
  .catch((err) => {
    console.log(err);
  });

pool.query(charReviewsQuery)
  .then((res) => {
    console.log('Characteristic reviews table is created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
