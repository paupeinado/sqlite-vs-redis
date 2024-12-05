import http from 'k6/http';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<20'], // 95% of requests must complete below 20ms
  },
};

const publishers = ['sft', 'rev', 'fhp'];
  
export default function () {
  const publisher = publishers[Math.floor(Math.random() * 3)];

  http.get(`http://localhost:${__ENV.PORT}/${publisher}/best-campaign`);
}