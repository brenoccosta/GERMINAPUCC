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
    req.session.returnTo = req.originalUrl;
    res.render('noticias', {produtos: listaProdutos});
});

module.exports = router;