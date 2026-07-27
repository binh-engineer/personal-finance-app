import http from 'http';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 1, email: 'bill@example.com' }, 'fifu489fakl438f6hj948ge34gdgsg', { expiresIn: '7d' });
const body = JSON.stringify({ amount: 60, type: 'expense', description: 'Debug update', categoryId: 2 });

const req = http.request(
  {
    hostname: 'localhost',
    port: 3001,
    path: '/api/transactions/1',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      Authorization: `Bearer ${token}`,
    },
  },
  (res) => {
    console.log('status', res.statusCode);
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('body', data);
    });
  }
);

req.on('error', (err) => {
  console.error('request error', err.message);
});
req.write(body);
req.end();
