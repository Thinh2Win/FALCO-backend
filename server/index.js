/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const express = require('express');
const reviewsRoutes = require('./routes/reviews_routes.js');
require('dotenv').config();

const app = express();

app.use(reviewsRoutes);


app.listen(process.env.REVIEWS_PORT);
console.log('[Router]: Server listening on:', process.env.REVIEWS_PORT);
