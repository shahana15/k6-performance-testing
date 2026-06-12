import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '20s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed:   ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/users');

  check(res, {
    'status is 200':          (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
    'has user data':          (r) => JSON.parse(r.body).length > 0,
  });

  sleep(1);
}