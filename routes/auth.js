var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res) {
  res.send('Área de autenticação - em desenvolvimento');
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', async function(req, res) {
  try {
    var { email, senha } = req.body;
    var user = await User.findOne({ email });
    
    if (!user || !(await user.verificarSenha(senha))) {
      return res.send('Email ou senha inválidos');
    }
    
    req.session.userId = user._id;
    res.redirect('/');
  } catch(err) {
    res.send('Erro no login: ' + err.message);
  }
});

router.post('/cadastro', async function(req, res) {
  try {
    var { nome, email, senha } = req.body;
    var user = new User({ nome, email, senha });
    await user.save();
    res.redirect('/auth/login');
  } catch(err) {
    res.send('Erro ao cadastrar: ' + err.message);
  }
});

module.exports = router;