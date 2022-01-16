var express = require("express");
var router = express.Router();
const connection = require("../util/connection");
const moment = require('moment');
const exeQuery = require('../util/exeQuery').exeQuery;

router.post("/reg-form-check", async (req, res, next) => {
  const { studClass, section, fname, lname, email, password, gender, income, value
    , age, bio, date } = req.body;

  const dateTimeFormatUpdate = 'YYYY-MM-DD HH:mm:ss';
  const time = moment.utc().format(dateTimeFormatUpdate);


  //insert into db:
  try {
    let query = `insert into roles (email,role) values ('${email}','Student')`
    let result = await exeQuery(query)

    query = `INSERT INTO studentdata (class, section,fname,lname,email,gender,incomeSource,value,age,bio,DateOfAdmission,password )
                 VALUES
                (${studClass} , '${section}' ,'${fname}' ,'${lname}','${email}','${gender}','${income}'
                 ,${value},${age},'${bio}','${date}','${password}')`

    results = await exeQuery(query);
    const datesObj = { dates: [] };
    query = `insert into attendance values ('${email}',
            '${time}',0,'${JSON.stringify(datesObj)}')`;
    result = await exeQuery(query);
    query = `select * from studentdata where email = '${email}'`;
    result = await exeQuery(query);
    res.render("studentData", { result });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

