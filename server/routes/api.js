var express = require("express");
var articleRouter = require("./articleRouter");
var aboutRouter = require("./aboutRouter");
var { commentFunc } = require("../controller/comment");
var { typeFunc } = require("../controller/type");

var router = express.Router();

router.get("/", (req, res, next) => {
  console.log("/ :>> ", req.url);
  res.json({ code: 200, message: "success" });
});

// 处理article请求
router.use("/article", articleRouter);

// 处理about请求
router.use("/about", aboutRouter);

// 处理 comment 请求
router.get("/comment", (req, res, next) => {
  console.log("/comment :>> ", req.url);
  res.json({ code: 200, message: "success" });
});

// 处理 type 请求
router.get("/type", (req, res, next) => {
  console.log("/type :>> ", req.url);
  res.json({ code: 200, message: "success" });
});

module.exports = router;
