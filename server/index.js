/* eslint-disable camelcase */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const pool = require('./db.js');
// Server URL
const URL = 'http://127.0.0.1';
const REVIEWS_URL = `${URL}:${process.env.REVIEWS_PORT}`;

const app = express();
app.use(express.json());

// Services routing: forwards request body to service, forwards response to client:
app.get('/reviews', (req, res) => {
  const { product_id, sort } = req.query;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const dataObj = {
    product: product_id,
    page,
    count,
    results: [],
  };
  pool.query(`SELECT r.*, JSON_agg(reviewphotos) AS photos
  FROM review r LEFT OUTER JOIN reviewphotos on r.review_id = reviewphotos.review_id WHERE product_id = '${product_id}'
  GROUP by r.review_id
  LIMIT ${count};`)
    .then((data) => {
      dataObj.results = data.rows;
      res.send(dataObj);
    });
});

// app.use('/reviews', (req, res) => {
//   const url = REVIEWS_URL + req.originalUrl;
//   console.log('[Router]: Routing to:', url);
//   axios(url, {
//     method: req.method,
//     data: req.body,
//   })
//     .then((apiRes) => {
//       console.log('[Router]: Sending data from Reviews API:', apiRes.data);
//       // res.send(apiRes.data);
//       res.send('hello');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use('/', (req, res) => {
  console.log('[REVIEWS]: Incoming request from routing server:', req.url);
  res.send('no route for this path yet');
});

app.listen(process.env.REVIEWS_PORT);
console.log('[Router]: Server listening on:', process.env.REVIEWS_PORT);
