const express = require('express');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
    req.session.returnTo = req.originalUrl;
    res.render('produtos', {produtos: [a]});
    
});

module.exports = router;