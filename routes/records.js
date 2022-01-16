const express = require("express");
const router = express.Router();
const connection = require("../util/connection");
const exeQuery = require('../util/exeQuery').exeQuery;

router.get("/showRecord", async (req, res, next) => {
  try {

    let pageNo;
    let limitvalue;
    if (req.query.page === undefined) {
      pageNo = 1;
      limitvalue = 2;
      console.log(pageNo);
      console.log(limitvalue);
    } else {
      pageNo = req.query.page;
      limitvalue = req.query.limit;
      console.log(limitvalue);
      console.log(pageNo);
    }
    const query = `SELECT * FROM studentData LIMIT ${(pageNo - 1) * limitvalue} ,
                    ${limitvalue * 1}`
    const result = await exeQuery(query);
    console.log(results.length);
    res.render("showRecord", {
      records: results,
      pageNo,
      limitvalue,
    });
  } catch (error) {
    console.log("incorrect token!");
    res.send("<h3>login please!</h3>");
  }
});

router.get("/updateRecord", async (req, res, next) => {
  try {
    const { fname, studentId } = req.query;
    console.log(fname, studentId);
    const query = `select * from studentdata where studentId = '${studentId}'`
    const result = await exeQuery(query);
    res.render("updateRecord", { fname, studentId, result });

  } catch (error) {
    console.log(error);
    res.sendStatus(500).send('Internal Server Error:Update')
  }

});

router.get("/deleteRecord", (req, res, next) => {
  const email = req.query.email;
  console.log(email);
  connection.query(
    `DELETE FROM roles WHERE email = '${email}' `,
    (error) => {
      if (error) {
        return console.log(error);
      }
      res.redirect('showRecord')
    }
  );
});

module.exports = router;