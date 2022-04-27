import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    // { duration: '60s', target: 200 },
    // { duration: '15s', target: 200 },
    // { duration: '30s', target: 300 },
    // { duration: '60s', target: 300 },
    // { duration: '15s', target: 400 },
    // { duration: '30s', target: 400 },
    { duration: '60s', target: 0 },
  ],
};

const API_BASE_URL = 'http://localhost:1901/reviews';

export default () => {
  http.get(`${API_BASE_URL}?product_id=${Math.floor(Math.random() * 1000011)}`);
  // http.get(`${API_BASE_URL}/meta?product_id=${Math.floor(Math.random() * 1000011)}`);
  sleep(0.1);
};
