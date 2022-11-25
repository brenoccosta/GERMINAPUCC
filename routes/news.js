const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();

let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

//query para receber os produtos com seus preços
const pesquisaProdutos = require('../public/js/queryProduto.js');
let listaProdutos = [];
pesquisaProdutos.queryProdutos(db, listaProdutos);

// FAZER QUERIES
router.get('/', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    res.render('noticias', {user: req.session.nome, produtos: listaProdutos});
});

router.get('/erro', function(req,res){
    res.render('noticias', {erroLogin: req.session.erroLogin })
})

module.exports = router;
