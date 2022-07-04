import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://raskalov:Hfcrfkjd98@cluster0.xkzc4.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB ERROR', err);
  });

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
