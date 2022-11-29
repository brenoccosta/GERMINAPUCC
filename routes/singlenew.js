const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

// query para receber as notícias
const pesquisanoticia = require('../public/js/querynoticias.js');
// let umanoticia = pesquisanoticia.querysinglenoticia(db, id);
let teste = [];

router.get('/:id', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    //console.log('user: '+res.locals.users);
    pesquisanoticia.querysinglenoticia(db, req.params.id, teste);
    res.render('noticia', {user: req.session.nome, noticia: teste[0]});
});

router.get('/erro', function(req,res){
    //res.send(req.session.returnTo)
    res.render('noticia', {erroLogin: req.session.erroLogin, noticia: teste})
});
  
module.exports = router;
