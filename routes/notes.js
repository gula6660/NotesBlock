var express = require('express');
var router = express.Router();
var Note = require('../models/Note'); 

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/:id', verificarLogin, async function(req, res) {
  try {
    var notaReal = await Note.findById(req.params.id);
    
    if (!notaReal || !notaReal.usuarioId || notaReal.usuarioId.toString() !== req.session.userId) {
      return res.status(404).send('Nota não encontrada ou acesso negado.');
    }

    res.render('nota', { nota: notaReal });
  } catch (err) {
    console.error("Erro ao carregar nota:", err);
    res.status(500).send('Erro ao carregar a nota.');
  }
});

router.post('/atualizar/:id', verificarLogin, async function(req, res) {
  try {
    var { title, content } = req.body;
    
    // 🌟 Uso do findById para evitar que o Mongoose quebre o servidor
    await Note.findByIdAndUpdate(req.params.id, { 
      titulo: title, 
      conteudo: content 
    });

    res.status(200).json({ sucesso: true, mensagem: 'Nota salva no banco!' });
  } catch (err) {
    console.error("Erro na atualização:", err.message);
    res.status(500).json({ sucesso: false, mensagem: err.message });
  }
});

router.post('/excluir/:id', verificarLogin, async function(req, res) {
  try {
    // 🌟 Uso do findById para mover para a lixeira com segurança
    await Note.findByIdAndUpdate(req.params.id, { 
      excluida: true 
    });
    res.status(200).json({ sucesso: true, mensagem: 'Nota movida para a lixeira!' });
  } catch (err) {
    console.error("Erro ao excluir:", err.message);
    res.status(500).json({ sucesso: false, mensagem: err.message });
  }
});

module.exports = router;