const { queryReviewsByProductId, queryReviewsMetaData, addReviewToDB, updateReviewAsHelpful, updateReviewAsReported } = require('../models/reviews_model.js');

const getReviewsByProductId = (req, res) => {
  const { product_id, sort } = req.query;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
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
  const dataObj = {
    product: product_id,
    page,
    count,
    results: [],
  };
  queryReviewsByProductId(productId, order, count)
    .then( data => {
      dataObj.results = data;
      res.send(dataObj);
    })
    .catch( err => {
      res.status(404).send(err);
    });
};

const getReviewsMetaData = (req, res) => {
  const { product_id } = req.query;
  queryReviewsMetaData(product_id)
    .then( data => {
      res.send(data);
    })
    .catch( err => {
      res.status(400).send(err);
    });
};

const postReview = (req, res) => {
  addReviewToDB(req.query)
    .then(() => {
      res.status(201).send('posted');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const markReviewAsHelpful = (req, res) => {
  updateReviewAsHelpful(req.query.review_id)
    .then(() => {
      res.send('Review Marked Helpful');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const reportReview = (req, res) => {
  updateReviewAsReported(req.query.review_id)
    .then(() => {
      res.send('Review Reported');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getReviewsByProductId,
  getReviewsMetaData,
  postReview,
  markReviewAsHelpful,
  reportReview
};

