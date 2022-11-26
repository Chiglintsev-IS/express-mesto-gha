const mongoose = require("mongoose");
const express = require('express');
const usersRouter = require("./routes/users");

const PORT = '3000';
const mongodbUrl = 'mongodb://localhost:27017/mestodb';

const app = express();
mongoose.connect(mongodbUrl);

app.use(express.json());
// app.use('/cards', route);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`App is running`);
});
