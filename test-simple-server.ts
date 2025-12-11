import express from 'express';

const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  res.json({ message: 'Simple test works!' });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});

console.log('After listen call');
