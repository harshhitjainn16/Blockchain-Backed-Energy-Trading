const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  console.log('Request received!');
  res.json({ status: 'ok' });
});

const server = app.listen(5000, () => {
  console.log('Server started on port 5000');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

console.log('Script continuing...');

// Keep process alive
setInterval(() => {
  console.log('Still running...');
}, 5000);
