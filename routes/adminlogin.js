const express = require("express");
const router = express.Router();
const connection = require("../util/connection");

router.get("/adminlogin", function (req, res, next) {
  res.clearCookie('info')
  res.render("adminlogin");
});

module.exports = router;