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

pool.query(`COPY review (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/Thinh2Win/Data/reviews.csv' DELIMITER ',' CSV HEADER;`)
  .then((res) => {
    console.log('Table is seeded');
    pool.end();
  })
  .catch((err) => {
    console.log(err);
  });

pool.query(reviewQuery)
  .then((res) => {
    console.log('Table is created');
    pool.end();
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
