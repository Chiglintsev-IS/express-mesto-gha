const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const { appendUserId } = require('./controllers/appendUserId');

const PORT = '3000';
const mongodbUrl = 'mongodb://localhost:27017/mestodb';

const app = express();
mongoose.connect(mongodbUrl);

// app.use(appendUserId);

// for tests pass
app.use((req, res, next) => {
  req.user = {
    _id: '638256526d407fce8afeb603', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(express.json());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT);
