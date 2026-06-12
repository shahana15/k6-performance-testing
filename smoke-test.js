import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '30s',
};

export default function () {
  // Using JSONPlaceholder - completely free, no auth needed
  const res = http.get('https://jsonplaceholder.typicode.com/users');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
    'has user data': (r) => JSON.parse(r.body).length > 0,
  });

  sleep(1);
}