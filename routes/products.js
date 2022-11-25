const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

//query para receber os produtos com seus preços
const pesquisaProdutos = require('../public/js/queryProduto.js');
let listaProdutos = [];
pesquisaProdutos.queryProdutos(db, listaProdutos);

router.get('/', function(req, res) {
    req.session.returnTo = req.originalUrl;
    res.render('produtos', {produtos: listaProdutos});
});

module.exports = router;
