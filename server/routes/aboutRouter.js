var express = require("express");
var { getAbout } = require("../controller/about");
var router = express.Router();

// about api /api/about
router.get("/", (req, res, next) => {
  getAbout(req, res);
});

module.exports = router;
