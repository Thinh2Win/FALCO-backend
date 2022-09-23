<!-- ABOUT THE PROJECT -->
## About The Project

FALCO MICROSERVICES

This is an API microservice that delivers reviews data for a catalog of products. This API handles get requests for all reviews of a product (paginated and sorted) as well as aggregate review data for a product (ie an overall rating) and also handles posts of new reviews. The database is PostgreSQL and all queries run on an average of 20 ms. The server layer is made with Node.js and Express. It is designed to be easily scalable through multiple AWS EC2 instances. While this project was deployed, it was on 7 EC2 instances. One instance was a reverse-proxy server made with NGINX that distributed traffic across 5 Express servers, in which, queried the Postgres database. This setup was able to handle up to 2,000 requests per second with an average response time of 80 ms and an error rate of less than 1%.



### Built With

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Node](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
