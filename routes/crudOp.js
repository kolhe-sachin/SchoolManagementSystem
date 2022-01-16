var express = require('express');
const connection = require('../util/connection');
var router = express.Router();
const exeQuery = require('../util/exeQuery').exeQuery;

router.get('/reg-form', (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  //console.log(fname,lname);
  res.clearCookie('jwtToken')

  res.render('reg-form');
})
router.post('/announcement', async (req, res, next) => {
  try {
    const announcement = req.body.ann;
    const msg = req.body.msg;
    console.log(announcement, msg);
    const query = `insert into updates values('${announcement}','${msg}')`
    const result = await exeQuery(query);
    res.render('addUpdates');
  } catch (e) {
    res.sendStatus(400).send('Error occured :announcement')
  }

})

module.exports = router;