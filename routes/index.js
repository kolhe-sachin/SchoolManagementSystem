const express = require('express');
const router = express.Router();
const connection = require("../util/connection");
const exeQuery = require('../util/exeQuery').exeQuery;

/* GET home page. */
router.get('/', function (req, res, next) {
  const email = req.query.email;
  const pass = req.query.pass;
  res.clearCookie('info')
  res.render('index', { title: 'Express' });
});

router.get("/home", async (req, res, next) => {
  try {
    const query = 'select * from updates';
    const result = await exeQuery(query);
    console.log(result)
    res.render('home', { result });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send('Page not found!')
  }
});


module.exports = router;
