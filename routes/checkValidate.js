const express = require('express');
const router = express.Router();
const connection = require('../util/connection');
const exeQuery = require('../util/exeQuery').exeQuery;
const verifyjwt = require('../util/verifyJwtToken');
const jwt = require('jsonwebtoken')


/* GET home page. */
router.post('/checkValidate', function (req, res, next) {
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email, pass);
    const secret = 'QWER@#$^'
    connection.query((`select * from studentdata where email = '${email}'`), (error, result, fields) => {
      if (result.length !== 0) {
        if (result[0].password === pass && result[0].email === email) {//counter condition needs to add
          console.log(result);
          console.log('login successful');
          jwt.sign({ user: 'IoneTech' }, secret, function (err, token) { // step -1 creating a token
            if (err) {
              console.log(err);
              res.status(500).send(err);
              return;
            } else {
              console.log('Inside');
              tokenGen = token;
              console.log(token);
              const info = {
                email,
                code: token,
                role: "student"
              }

              res.cookie('info', info); // step -2 & 3 , creating a cookie an dloading token in cookie
              // res.role('/adminlogin')
              res.redirect('/showData');
              //res.render('home',{title : result.fname})
            }
          })
        } else {
          console.log(error);
          res.send('check username / password!');
        }
      } else {
        res.send('<h2 style="color : red;">Check username/password!</h2>')
      }
    });


  } catch (error) {
    console.log('check username');
  }

})


router.post("/authorizeLogin", function (req, res, next) {
  const uname = req.body.Uname;
  const pass = req.body.Pass;
  console.log(uname, pass)
  const secret = 'QWER@#$^'
  connection.query(`SELECT * FROM Admin WHERE email='${uname}' `, (error, result) => {
    if ((result[0].email === uname) && (result[0].password === pass)) {
      console.log("matched");
      jwt.sign({ user: 'IoneTech' }, secret, function (err, token) { // step -1 creating a token
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        } else {
          console.log('Inside');
          tokenGen = token;
          console.log(token);
          const info = {
            username: "uname",
            code: token,
            role: "Admin"
          }

          res.cookie('info', info);
        }
        res.redirect('/showData1')
      })
    } else {
      console.log(error)
      res.send("invalid input and password!");
    }
  }
  );
});

module.exports = router;




