/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const pool = require('./db.js');

const app = express();
app.use(express.json());

// Services routing: forwards request body to service, forwards response to client:
app.get('/reviews', (req, res) => {
  const { product_id, sort } = req.query;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  let offset = 0;
  let order = '';
  switch (sort) {
    case 'newest':
      order = 'date';
      break;
    case 'helpful':
      order = 'helpfulness';
      break;
    case 'relevant':
      order = 'helpfulness';
      break;
    default:
      order = 'product_id';
  }

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
    ORDER BY ${order} DESC
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

// app.post('/reviews', (req, res) => {
//   const q = req.query;
//   pool.query(`INSERT INTO review VALUES (${q.product_id}, '${q.rating}', '${q.date}', '${q.summary}', '${q.body}', '${q.recommend}', 'false', '${q.name}', '${q.email}', 'null', '0');`)
//     .then(() => {
//       res.status(201).send('posted');
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.put('/reviews/helpful', (req, res) => {
  pool.query(`
  UPDATE review
  SET helpfulness = helpfulness + 1
  WHERE review_id = ${req.query.review_id}
  ;`)
    .then(() => {
      res.send('Review Marked Helpful');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put('/reviews/report', (req, res) => {
  pool.query(`
  UPDATE review
  SET reported = true
  WHERE review_id = ${req.query.review_id}
  ;`)
    .then(() => {
      res.send('Review Reported');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.use('/', (req, res) => {
  console.log('[REVIEWS]: Incoming request from routing server:', req.url);
  res.send('no route for this path yet');
});

app.listen(process.env.REVIEWS_PORT);
console.log('[Router]: Server listening on:', process.env.REVIEWS_PORT);
