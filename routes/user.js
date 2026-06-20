var express = require('express');
var router = express.Router();
var User = require('../models/User');

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

//não sei se isso faz sentido
router.get('/perfil', verificarLogin, async function(req, res) {
  try {
    var user = await User.findById(req.session.userId);
    res.render('perfil', { user: user });
  } catch (err) {
    res.send('Erro ao carregar o perfil.');
  }
});

router.post('/editar', verificarLogin, async function(req, res) {
  try {
    var { nome, email, senhaAtual, novaSenha } = req.body;
    var user = await User.findById(req.session.userId);

    if (nome) user.nome = nome;
    if (email) user.email = email;

    if (novaSenha) {
      if (await user.verificarSenha(senhaAtual)) {
        user.senha = novaSenha; 
      } else {
        return res.send('Senha atual incorreta.'); 
      }
    }

    await user.save();
    res.redirect('/user/perfil');
  } catch (err) {
    res.send('Erro ao atualizar: ' + err.message);
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/login');
  });
});

module.exports = router;