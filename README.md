<!-- ABOUT THE PROJECT -->

# Product Reviews API
A back end service-oriented api scaled to support more than half a thousand requests per second for the product reviews section of an eCommerce website.

## Technologies Used
- [Node.js](https://nodejs.org/en/) - RESTful API
- [Express](http://expressjs.com/) - Node.js Web App Framework
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [NGINX](https://www.nginx.com/) - Load Balancing
- [k6](https://k6.io/) - Load Testing (Local)
- [Loader.io](https://loader.io/) - Load Testing (Cloud)
- [AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## API Endpoints
| Method        | Endpoint      | Description   | Parameters    |
| ------------- | ------------- | ------------- | ------------- |
| GET           | /reviews | Retrieves reviews | product_id, order, count |
| GET           | /reviews/meta | Retrieves meta data for a review | review_id |
| POST          | /reviews | Posts a review | product_id, body, name, email |
| PUT           | /reviews/:review_id/helpful | Mark review as helpful | review_id |
| PUT           | /reviews/:review_id/report | Report a review | review_id |

## Performance Metrics with k6 (Local)
Goals:
- 1000 requests per second
- <50ms response time

Achieved:
- 38ms average response time for 1000rps

## Performance Metrics with Loader.io (Cloud)
Goals:
- <2000ms response time
- <1% error rate

Achieved:
### Endpoint: /qa/questions
![Screen Shot 2022-05-02 at 10 45 26 AM](https://user-images.githubusercontent.com/77183806/166298523-4cdf9334-7ae6-4c86-b1d3-c1d0cf748213.png)

### Endpoint: /qa/answers
![Screen Shot 2022-05-02 at 10 45 56 AM](https://user-images.githubusercontent.com/77183806/166298577-67c9bf56-6a10-4844-9a1d-c03129b35b3d.png)
