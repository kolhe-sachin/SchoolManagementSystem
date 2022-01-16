var express = require('express');
var router = express.Router();

router.get('/mainHome', function(req, res, next) {
  res.render('mainHome', { title: 'Express' });
});
module.exports = router;