const express = require('express');
const { randomSalt,hashPassword } = require('../public/js/criptografia');

const router = express.Router();



function verificaLogin(req,res,next){
    let email = req.body.email;
    let password = req.body.psw;
    //res.send(user+' e '+password);
    let db = req.app.locals.db;
    let backURL = req.header('Referer') || '/';
    // let nome = req.app.get('nome');
    // res.send(nome);
    //res.send(db);
    // db.all('SELECT salt FROM usuario WHERE email = ?',[email], (err,rows) => {
	// 	if(err){
	// 		throw(err);
	// 	}
	// 	res.send(rows)
	// })
    db.get('SELECT salt FROM usuario WHERE email = ?',[email], function(err, row) {
        if (!row){
            return res.redirect(req.session.returnTo);
        }
        //res.send(row.salt);
        
        var hash = hashPassword(password, row.salt);
        db.get('SELECT nome, idUsuario FROM usuario WHERE email = ? AND password = ?', [email,hash], function(err, row) {
          if (!row){
            return res.redirect(req.session.returnTo);
          }
          res.send(row);
        });
      });
}
// FAZER QUERIES
router.get('/', function(req, res) {
  req.session.returnTo = req.originalUrl;
  res.render('index', { teste: 'Fernando'});
});


router.post('/',verificaLogin,function(req,res) {
    
});


module.exports = router;