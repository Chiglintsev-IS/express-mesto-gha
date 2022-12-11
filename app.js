const mongoose = require('mongoose');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = '3000';
const mongodbUrl = 'mongodb://localhost:27017/mestodb';

const app = express();
mongoose.connect(mongodbUrl);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '638256526d407fce8afeb603', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(express.json());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.all('*', (req, res) => {
  res.status(400).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
