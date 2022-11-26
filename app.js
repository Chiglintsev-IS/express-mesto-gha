const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { appendUserId } = require('./controllers/appendUserId');

const PORT = '3000';
const mongodbUrl = 'mongodb://localhost:27017/mestodb';

const app = express();
mongoose.connect(mongodbUrl);

app.use(appendUserId);
app.use(express.json());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT);
