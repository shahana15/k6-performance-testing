import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // ramp up to 10 users
    { duration: '1m',  target: 10 },  // hold at 10 users
    { duration: '20s', target: 0  },  // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],  // 95% of requests must be under 3s
    http_req_failed:   ['rate<0.01'],   // less than 1% errors
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/users');

  check(res, {
    'status is 200':          (r) => r.status === 200,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
    'has user data':          (r) => JSON.parse(r.body).length > 0,
  });

  sleep(1);
}