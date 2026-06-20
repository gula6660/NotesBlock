var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');   
var userRouter = require('./routes/user'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/user', userRouter);
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');

// Importar rotas existentes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Importar novas rotas (você vai criar esses arquivos)
var authRouter = require('./routes/auth');
var notesRouter = require('./routes/notes');
var userRouter = require('./routes/user');

var app = express();

// CONEXÃO COM MONGODB
mongoose.connect('mongodb://giuliaamaromartins07_db_user:4l8vjRkhWvCttEU8@cluster0.m2epwz3.mongodb.net/?appName=Cluster0')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

// CONFIGURAÇÃO DA VIEW ENGINE (já existia)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES EXISTENTES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MIDDLEWARE DE SESSÃO (NOVO)
app.use(session({
  secret: 'segredo_do_notesblock',
  resave: false,
  saveUninitialized: false
}));

// ARQUIVOS ESTÁTICOS (já existia, mas mantém)
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS EXISTENTES
app.use('/', indexRouter);
app.use('/users', usersRouter);

// NOVAS ROTAS
app.use('/auth', authRouter);
app.use('/notes', notesRouter);
app.use('/user', userRouter);

// TRATAMENTO DE ERRO 404 (já existia)
app.use(function(req, res, next) {
  next(createError(404));
});

// TRATAMENTO DE ERROS (já existia)
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;