var express = require("express");
var { getAbout } = require("../controller/about");
var router = express.Router();

router.get("/", (req, res, next) => {
  console.log("req :>> ", req);
  getAbout(req, res);
});

module.exports = router;
