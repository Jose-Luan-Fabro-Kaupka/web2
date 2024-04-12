const express = require('express');
const db = require('./config/db_sequelize');
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
//var csrf = require('csurf');
var passport = require('passport');
var logger = require('morgan');
const session = require('express-session');

//123

const app = express();

// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }));

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.pluralize = require('pluralize');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));
// app.use(csrf());
app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
});
// app.use(function(req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });



app.use('/', indexRouter);
app.use('/', authRouter)

// db.start()
//   .then(() => {
//     const PORT = 8081;
//     app.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Erro ao iniciar o banco de dados:', error);
//   });



app.locals.pluralize = require('pluralize');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something stored
 // store: db
}));
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});
module.exports = app;