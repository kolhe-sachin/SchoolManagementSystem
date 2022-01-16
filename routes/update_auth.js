var express = require("express");
const connection = require("../util/connection");
var router = express.Router();
const exeQuery = require('../util/exeQuery').exeQuery;
const verifyjwt = require('../util/verifyJwtToken');

router.post("/update_auth", async function (req, res, next) {
  try {
    const verifyResult = await verifyjwt.verifyJwtAuth(req.cookies.info.code)
    if (verifyResult === 'Verified Successfully') {
      const { first_name, studentId, section, lname, bio, email } = req.body;
      let query = `UPDATE studentData SET fname = '${first_name}' ,lname = '${lname}' ,section = '${section}' , 
                  bio = '${bio}' ,email = '${email}' WHERE studentId = ${studentId}`;
      let result = await exeQuery(query);
       query = `select * from studentData where studentId = ${studentId}`
       result = await exeQuery(query)
      res.redirect('showRecord')
    }
  } catch (e) {
    console.log('Error occured during updation');
    // console.log(e);
    res.status(500).send('<h2>Internal server error!</h2>')
  }

});

module.exports = router;