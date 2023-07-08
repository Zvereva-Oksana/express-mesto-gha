const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64a57faf937bd2dd83dba314',
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
