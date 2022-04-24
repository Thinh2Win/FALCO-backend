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
  pool.query(`
    SELECT r.*,
    COALESCE(
      json_agg(
        json_build_object(
          'id', reviewphotos.id,
          'url', reviewphotos.url
        )
      )
      FILTER (WHERE reviewphotos.id IS NOT NULL), '[]') AS photos
    FROM review r
    LEFT OUTER JOIN reviewphotos on r.review_id = reviewphotos.review_id
    WHERE product_id = '${product_id}'
    GROUP by r.review_id
    LIMIT ${count};
    `)
    .then((data) => {
      dataObj.results = data.rows;
      res.send(dataObj);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query;
  pool.query(`
    SELECT json_build_object (
      'product_id', ${product_id},
      'ratings', (
        json_build_object(
          '1', (SELECT COUNT(rating) FROM (SELECT rating FROM review WHERE product_id = ${product_id} AND rating = 1) AS count ),
          '2', (SELECT COUNT(rating) FROM (SELECT rating FROM review WHERE product_id = ${product_id} AND rating = 2) AS count ),
          '3', (SELECT COUNT(rating) FROM (SELECT rating FROM review WHERE product_id = ${product_id} AND rating = 3) AS count ),
          '4', (SELECT COUNT(rating) FROM (SELECT rating FROM review WHERE product_id = ${product_id} AND rating = 4) AS count ),
          '5', (SELECT COUNT(rating) FROM (SELECT rating FROM review WHERE product_id = ${product_id} AND rating = 5) AS count )
        )
      ),
      'recommended', (
        json_build_object(
          0, (SELECT COUNT(recommend) FROM (SELECT recommend FROM review WHERE product_id = ${product_id} AND recommend = false) AS count ),
          1, (SELECT COUNT(recommend) FROM (SELECT recommend FROM review WHERE product_id = ${product_id} AND recommend = true) AS count )
        )
      ),
      'characteristics', (
          (SELECT json_agg(
            json_build_object(
              'id', characteristics.id,
              'name', characteristics.name,
              'value', ((SELECT AVG (value) FROM characteristicreviews WHERE characteristic_id = characteristics.id)::numeric(10,4))
            )
          ) FROM characteristics WHERE product_id = ${product_id})
      )
    ) AS result
  ;`)
    .then((data) => {
      const query = data.rows[0].result;
      const container = {};
      query.characteristics.forEach(characteristic => {
        container[characteristic.name] = {
          id: characteristic.id,
          value: characteristic.value,
        };
      });
      query.characteristics = container;
      res.send(query);
    })
    .catch((err) => {
      console.log(err);
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
