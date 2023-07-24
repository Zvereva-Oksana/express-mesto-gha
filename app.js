const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { signinValidation, signupValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Несуществующий роут'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
