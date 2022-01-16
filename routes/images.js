var express = require('express');
var router = express.Router();

router.get('/images', function(req, res, next) {
  res.render('images', { title: 'Express' });
});
module.exports = router;