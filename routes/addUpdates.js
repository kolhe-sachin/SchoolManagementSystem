const express = require("express");
const router = express.Router();
const verifyjwt = require('../util/verifyJwtToken');

router.get("/addUpdates", function (req, res, next) {
  verifyjwt.verifyJwtAuth(req.cookies.info.code).then((result) => {
    if (result === 'Verified Successfully') {
      if (req.cookies.info.role === 'Admin') {
        console.log(`Admin is accessing!`);
        res.render("addUpdates");
      } else {
        console.log('admin is not present!')
      }
    } else {
      console.log('error');
    }
  }).catch((e) => {
    console.log(e);
  })
});

module.exports = router;