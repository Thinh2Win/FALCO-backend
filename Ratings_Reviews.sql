CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INT,
  date BIGINT,
  summary varchar(100),
  body varchar(100),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name varchar(50),
  reviewer_email varchar(50),
  response varchar(100),
  helpfulness INT
)

CREATE TABLE reviewPhotos (
  id INT NOT NULL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url varchar(200)
)

CREATE TABLE characteristics (
  characteristics_id INT NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name varchar(50)
)

CREATE TABLE characteristicReviews (
  id INT NOT NULL PRIMARY KEY,
  characteristics_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL
)