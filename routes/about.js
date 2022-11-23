const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    req.session.returnTo = req.originalUrl;
    res.render('sobre');
});

module.exports = router;