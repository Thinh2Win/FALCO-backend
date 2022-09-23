const pool = require('./db.js');

const queryReviewsByProductId = (productId, order, count) => {
  return pool.query(`
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
    WHERE product_id = '${productId}'
    GROUP by r.review_id
    ORDER BY ${order} DESC
    LIMIT ${count};
    `)
    .then((data) => data.rows)
    .catch((err) => {
      console.log(err);
    });
};

const queryReviewsMetaData = (productId) => {
  return pool.query(`
    SELECT json_build_object (
      'product_id', ${productId},
      'ratings', (
        SELECT json_object_agg(rating, count)
        FROM (
          SELECT rating, COUNT(*)
          FROM review
          WHERE product_id = ${productId}
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
          WHERE product_id = ${productId}
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
          ) FROM characteristics WHERE product_id = ${productId})
      )
    ) AS result
  ;`)
    .then( data => {
      const query = data.rows[0].result;
      const container = {};
      query.characteristics.forEach(characteristic => {
        container[characteristic.name] = {
          id: characteristic.id,
          value: characteristic.value,
        };
      });
      query.characteristics = container;
      return query;
    })
    .catch( err => {
      console.log(err);
    });
};

const addReviewToDB = (queryObj) => {
  let q = queryObj;
  return pool.query(`INSERT INTO review VALUES (${q.product_id}, '${q.rating}', '${q.date}', '${q.summary}', '${q.body}', '${q.recommend}', 'false', '${q.name}', '${q.email}', 'null', '0');`)
    .then(() => console.log('success'))
    .catch(err => err);
};

const updateReviewAsHelpful = (reviewId) => {
  return pool.query(`
  UPDATE review
  SET helpfulness = helpfulness + 1
  WHERE review_id = ${reviewId}
  ;`)
    .then(() => console.log('Review Marked Helpful'))
    .catch(err => err );
};

const updateReviewAsReported = (reviewId) => {
  return pool.query(`
  UPDATE review
  SET reported = true
  WHERE review_id = ${reviewId}
  ;`)
    .then(() => console.log('review reported'))
    .catch(err => err);
};

module.exports = {
  queryReviewsByProductId,
  queryReviewsMetaData,
  addReviewToDB,
  updateReviewAsHelpful,
  updateReviewAsReported
};