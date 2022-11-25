const express = require('express');
const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
  req.session.erroLogin = false;
  req.session.returnTo = req.originalUrl;
  res.render('index', {user: req.session.nome});
});


router.get('/erro', function(req,res){
  
  res.render('index', {erroLogin: req.session.erroLogin })
})


module.exports = router;