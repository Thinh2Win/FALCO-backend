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
  pool.query(`SELECT * FROM review WHERE product_id = '${product_id}';`)
    .then((data) => {
      const arr = data.rows.slice(0, count).map((review) => {
        review.date = new Date(review.date);
        return pool.query(`SELECT * FROM reviewphotos WHERE review_id = ${review.review_id};`)
          .then((photos) => {
            review['photos'] = photos.rows;
            return review;
          })
          .catch((err) => {
            console.log(err);
          });
      });
      Promise.all(arr)
        .then((review) => {
          dataObj.results = review;
          res.send(dataObj);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
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
