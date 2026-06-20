var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');

// 1. INICIALIZAÇÃO DO APP
var app = express();

// 2. CONEXÃO COM O MONGODB (Usando a string que funciona na sua rede local/Atlas corrigida)
mongoose.connect('mongodb://giulia09_db_user:pass4worD@ac-u7gvd7r-shard-00-00.kr3bgke.mongodb.net:27017,ac-u7gvd7r-shard-00-01.kr3bgke.mongodb.net:27017,ac-u7gvd7r-shard-00-02.kr3bgke.mongodb.net:27017/?ssl=true&replicaSet=atlas-3dg16a-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

// 3. CONFIGURAÇÃO DO MOTOR DE TELAS (VIEW ENGINE)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 4. MIDDLEWARES PADRÃO (Sem repetições)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 5. CONFIGURAÇÃO DE SESSÃO (Para o login funcionar)
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false
}));

// 6. IMPORTAÇÃO DAS ROTAS
var principalRouter = require('./routes/principal');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');   
var userRouter = require('./routes/user'); 
var newnotesRouter = require('./routes/newnotes'); 
var lixeiraRouter = require('./routes/lixeira'); 
var loginRouter = require('./routes/login');

// 7. ATIVAÇÃO DAS ROTAS NO EXPRESS
app.use('/principal', principalRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/user', userRouter);
app.use('/newnotes', newnotesRouter);
app.use('/lixeira', lixeiraRouter);
app.use('/login', loginRouter);

// 8. TRATAMENTO DE ERRO 404 (Página não encontrada)
app.use(function(req, res, next) {
  next(createError(404));
});

//erros
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500);
  
  try {
    res.render('error');
  } catch (renderError) {
    res.send('Erro interno no servidor: ' + err.message);
  }
});

// 10. EXPORTAÇÃO DO APP OTIMIZADO
module.exports = app;