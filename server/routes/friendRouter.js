var express = require("express");
var { getFriend } = require("../controller/friend");
var router = express.Router();

// friend /api/friend/getFriend
router.get("/getFriend", (req, res, next) => {
    getFriend(req, res);
});

module.exports = router;