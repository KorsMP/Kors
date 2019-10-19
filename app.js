var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var expressValidator = require('express-validator');
var logger = require('morgan');
var globals = require('./public/globals');

var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: globals.db_host,
  port: globals.db_port,
  user: globals.db_user,
  password: globals.db_password,
  database: globals.db_name
};
var sessionStore = new MySQLStore(options);
var passport = require('passport');
const fileUpload = require('express-fileupload');
var cors = require('cors');


var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var authenticationRouter = require('./routes/isAuthenticated');
var logoutRouter = require('./routes/logout');
var addCategoryRouter = require('./routes/addCategory');
var addQuestionRouter = require('./routes/addQuestion');
var addAnswerRouter = require('./routes/addAnswer');
var getQuestionsRouter=require('./routes/getQuestions');
var getAnswersRouter = require('./routes/getAnswers');
var updateVotesRouter = require('./routes/updateVotes');
var tempRouter = require('./routes/temp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: globals.domain_url,
  credentials: true,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: globals.secret_sessionKey,
  saveUninitialized: false,
  resave: false,
  store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/isAuthenticated', authenticationRouter);
app.use('/logout', logoutRouter);
app.use('/addCategory', addCategoryRouter);
app.use('/addQuestion', addQuestionRouter);
app.use('/addAnswer', addAnswerRouter);
app.use('/getQuestions', getQuestionsRouter);
app.use('/getAnswers', getAnswersRouter);
app.use('/updateVotes', updateVotesRouter);
app.use('/temp', tempRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
