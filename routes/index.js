var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { header: "Velocity 360", visitor: "Dan" });

});

router.get('/profile', function(req, res, next) {

  res.render('profile', null);

});


module.exports = router;
