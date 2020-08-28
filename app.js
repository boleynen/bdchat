const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/r.index');
const accountRouter = require('./routes/r.account');
const apiChatRouter = require('./routes/api/v1/r.chat');

const passport = require('./passport/passport');
const socketIo = require('socket.io');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/bdchat', {
  useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(cors({origin: '*'}));
// app.use(cors({origin: 'http://localhost:5500'}));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/api/v1/chat', apiChatRouter);

// app.use('/api/v1/chat', passport.authenticate('jwt', {
//   session: false 
// }), apiChatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
