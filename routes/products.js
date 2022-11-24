const express = require('express');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    res.render('produtos');
});

router.get('/erro', function(req,res){
    //res.send(req.session.returnTo)
    res.render('produtos', {erroLogin: req.session.erroLogin })
});
  

module.exports = router;