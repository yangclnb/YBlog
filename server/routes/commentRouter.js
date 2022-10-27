var express = require("express");
var router = express.Router();

var {
  getCurrentArticleComment,
  setCurrentArticleComment,
} = require("../controller/comment");

// 根据文章ID 获取当前文章的评论信息 /api/comment method:get
router.get("/:blogId", function (req, res, next) {
  let blogID = req.params.blogId;
  console.log("访问" + blogID + "的评论");

  if (isNaN(blogID)) res.json({ code: 400, msg: "参数错误" });
  else getCurrentArticleComment(blogID, req, res);
});

router.post("/", function (req, res, next) {
  let currentIP = req.header["x-forwarded-for"] || req.socket.remoteAddress;
  // console.log(req.body);
  setCurrentArticleComment(
    res,
    req.body.blogId,
    currentIP,
    req.body.userName,
    req.body.comment
  );
});

module.exports = router;
