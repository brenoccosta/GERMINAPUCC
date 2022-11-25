const express = require('express');

const router = express.Router();
const cryptography = require('../public/js/criptografia');
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

function emailExiste(req,res,next){
	db.all('SELECT * FROM usuario WHERE email = ?',[req.body.email], (err,rows) => {
		if(err){
			throw(err);
		}
		if(rows.length>0){
      res.render('cadastro', {msgErro: true});
    }	
		else
			next();
	})
};

router.get('/', function(req, res) {
  req.session.returnTo = req.originalUrl;
  res.render('cadastro');
});

router.post('/', emailExiste,function(req, res) {
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let email = req.body.email;
    let senha = req.body.psw;

    let salt = cryptography.randomSalt();
    let hash = cryptography.hashPassword(senha,salt);

    db.run(`INSERT INTO usuario(nome,sobrenome,password,salt,email) VALUES(?,?,?,?,?)`, [nome,sobrenome,hash,salt,email], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    res.redirect('/');
    
});

module.exports = router;
