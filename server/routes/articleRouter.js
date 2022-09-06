var express = require("express");
var {
  getArticleByID,
  getArticalByVisitorInfo,
  getArticleSection,
  getArticleTotalTimeLine,
  addVisitorInfo,
} = require("../controller/article");
var router = express.Router();

// 文章访问数量，依照次排序推荐列表 (api/article/recommendList)
router.get("/recommendList", (req, res, next) => {
  getArticalByVisitorInfo(req, res);
});

// 根据文章ID增加文章的访问量 (api/article/addVisitorInfo/文章ID)
router.get("/addVisitorInfo/:articleID", (req, res, next) => {
  let articleID = req.params.articleID; // 当前读取的文章ID
  let currentIP = req.header["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("currentIP :>> ", currentIP);
  addVisitorInfo(req, res, articleID, currentIP);
});

router.get("/timeline", (req, res, next) => {
  getArticleTotalTimeLine(req, res);
});

router.get("/getArticle/:articleID", (req, res, next) => {
  // 按照文章 ID 查询
  console.log("文章 id 为:", req.params.articleID);
  getArticleByID(req, res, req.params.articleID);
});

router.get("/getArticle/:articleNums/:setoff", (req, res, next) => {
  // 查询从 setoff 开始的 articleNums 条文章数据
  console.log("get 请求 获取文章", req.url);
  getArticleSection(req, res, req.params.articleNums, req.params.setoff);
});

// TODO 提交 POST 时增加文章 {title:"xxx",content:"xxx",pubtime:"xxx"}
router.post("/", (req, res, next) => {
  console.log("post 请求 增加文章", req.body);
  res.json({ code: 200, message: "success" });
});

// TODO 提交 DELETE 请求时删除文章 (api/article/文章ID)
router.delete("/:articleID", (req, res, next) => {
  console.log("delete 请求 删除文章", req.body);
  res.json({ code: 200, message: "success" });
});

// TODO 提交 PUT 请求时，更改文章的内容 (api/article/文章ID) {title:"xxx",content:"xxx"}
router.put("/:articleID", (req, res, next) => {
  console.log("put 请求 更改文章", req.body);
  res.json({ code: 200, message: "success" });
});

module.exports = router;
