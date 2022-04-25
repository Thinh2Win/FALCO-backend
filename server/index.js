/* eslint-disable no-unused-expressions */
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
  let offset = 0;
  page > 1 ? offset = (page - 1) * count : offset = 0;
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
    OFFSET ${offset}
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
pool.query(`SELECT rating, COUNT(*) FROM review where product_id = 2 GROUP BY rating ORDER BY rating`)
app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query;
  pool.query(`
    SELECT json_build_object (
      'product_id', ${product_id},
      'ratings', (
        SELECT json_object_agg(rating, count)
        FROM (
          SELECT rating, COUNT(*)
          FROM review
          WHERE product_id = ${product_id}
          GROUP BY rating
          ORDER BY rating
          ) AS ratings
      ),
      'recommended', (
        SELECT json_object_agg(
          CAST(
            CASE WHEN recommend = 'true' THEN 1
            ELSE 0
            END as bit
          ), count)
        FROM (
          SELECT recommend, COUNT(*)
          FROM review
          WHERE product_id = ${product_id}
          GROUP BY recommend
          ORDER BY recommend
        ) AS recommend
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
