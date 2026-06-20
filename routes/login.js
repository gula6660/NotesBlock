var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res) {
  res.render('loginc', { erro: null }); 
});

router.post('/', async function(req, res) {
  try {
    var { email, senha } = req.body;
    var user = await User.findOne({ email });
    
    if (!user || !(await user.verificarSenha(senha))) {
      return res.render('loginc', { erro: 'Email ou senha inválidos' });
    }
    
    req.session.userId = user._id;
    res.redirect('/principal');
  } catch(err) {
    res.render('loginc', { erro: 'Erro no servidor: ' + err.message });
  }
});

router.post('/cadastro', async function(req, res) {
  try {
    var { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
      return res.render('loginc', { erro: 'Por favor, preencha todos os campos.' });
    }

    var user = new User({ nome, email, senha });
    await user.save();
    
  res.redirect('/login'); 
  } catch(err) {
    console.error("Erro capturado no cadastro:", err);
    
    if (err.code === 11000) {
      return res.render('loginc', { erro: 'Este e-mail já está cadastrado no sistema.' });
    }

    res.render('loginc', { erro: 'Erro no Banco/Model: ' + err.message });
  }
});

module.exports = router;