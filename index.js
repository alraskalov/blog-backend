import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
    },
    'dev-secret'
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
