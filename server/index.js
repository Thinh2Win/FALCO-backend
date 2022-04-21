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
app.use('/reviews', (req, res) => {
  const url = REVIEWS_URL + req.originalUrl;
  console.log('[Router]: Routing to:', url);
  axios(url, {
    method: req.method,
    data: req.body,
  })
    .then((apiRes) => {
      console.log('[Router]: Sending data from Reviews API:', apiRes.data);
      // res.send(apiRes.data);
      res.send('hello');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/', (req, res) => {
  console.log('[REVIEWS]: Incoming request from routing server:', req.url);
  res.send('no route for this path yet');
});

app.listen(process.env.REVIEWS_PORT);
console.log('[Router]: Server listening on:', process.env.REVIEWS_PORT);
