import http from 'http';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 1, email: 'bill@example.com' }, 'fifu489fakl438f6hj948ge34gdgsg', { expiresIn: '7d' });
const tests = [
  { method: 'GET', path: '/api/transactions', body: null },
  { method: 'POST', path: '/api/transactions', body: JSON.stringify({ amount: 10, type: 'income', description: 'check', categoryId: 1 }) },
  { method: 'PUT', path: '/api/transactions/1', body: JSON.stringify({ amount: 60, type: 'expense', description: 'updated', categoryId: 2 }) },
];

let i = 0;

function runTest() {
  if (i >= tests.length) return;
  const { method, path, body } = tests[i++];
  const headers = { Authorization: `Bearer ${token}` };
  if (body) {
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(body);
  }
  const req = http.request({ hostname: 'localhost', port: 3001, path, method, headers }, (res) => {
    console.log('===', method, path, '===');
    console.log('status', res.statusCode);
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('body', data);
      runTest();
    });
  });
  req.on('error', (err) => {
    console.error(method, path, 'error', err.message);
    runTest();
  });
  if (body) req.write(body);
  req.end();
}

runTest();
