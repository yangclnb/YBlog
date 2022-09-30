var express = require("express");
var articleRouter = require("./articleRouter");
var aboutRouter = require("./aboutRouter");
var friednRouter = require("./friendRouter");
var commentRouter = require("./commentRouter");

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

// 处理friend请求
router.use("/friend", friednRouter);

// 处理 comment 请求
router.use("/comment",commentRouter);

// 处理 type 请求
router.get("/type", (req, res, next) => {
  console.log("/type :>> ", req.url);
  res.json({ code: 200, message: "success" });
});

module.exports = router;
