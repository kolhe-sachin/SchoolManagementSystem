var express = require('express');
var router = express.Router();
const verifyjwt = require('../util/verifyJwtToken');
const connection = require('../util/connection');
const exeQuery = require('../util/exeQuery').exeQuery;


/* GET home page. */
router.get('/showData', async function (req, res, next) {
  console.log(req.cookies);
  try {
    const verifyResult = await verifyjwt.verifyJwtAuth(req.cookies.info.code)
    if (verifyResult === 'Verified Successfully') {
      const query = `select * from studentdata where email = '${req.cookies.info.email}'`;
      const result = await exeQuery(query);
      res.render('studentData', { result })
    }
  } catch (e) {
    console.log('Error');
    res.status(400).send('Error occured!')
  }
});

module.exports = router;
