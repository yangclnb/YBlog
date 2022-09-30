var express = require("express");
var {
  getAllArticle,
  getArticleByID,
  getArticalNums,
  getArticalByVisitorInfo,
  getArticleSection,
  getArticleTotalTimeLine,
  addVisitorInfo,
  getVisitorData,
} = require("../controller/article");
var router = express.Router();

// 获取文章数量
router.get("/getArticalNums", (req, res, next) => {
  getArticalNums(req, res);
});

// 获取最近七天的访问数据
router.get("/visitorData", (req, res, next) => {
  getVisitorData(req, res);
});

// 文章访问数量，依照次排序推荐列表 (api/article/recommendList)
router.get("/recommendList", (req, res, next) => {
  getArticalByVisitorInfo(req, res);
});

// 根据文章ID增加文章的访问量 (api/article/addVisitorInfo/文章ID)
router.get("/addVisitorInfo/:articleID", (req, res, next) => {
  // TODO 参数判断
  let articleID = req.params.articleID; // 当前读取的文章ID
  let currentIP = req.header["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("currentIP :>> ", currentIP);
  addVisitorInfo(req, res, articleID, currentIP);
});

router.get("/timeline", (req, res, next) => {
  getArticleTotalTimeLine(req, res);
});

router.get("/getAllArticle", (req, res, next) => {
  // 返回所有的文章
  getAllArticle(req, res);
});

router.get("/getArticle/:articleID", (req, res, next) => {
  // 按照文章 ID 查询
  console.log("文章 id 为:", req.params.articleID);
  // 参数判断
  if (isNaN(req.params.articleID))
    res.json({ code: 400, msg: "文章索引错误!" });
  else getArticleByID(req, res, req.params.articleID);
});

router.get("/getArticle/:articleNums/:setoff", (req, res, next) => {
  // 查询从 setoff 开始的 articleNums 条文章数据
  console.log("get 请求 获取文章", req.url);
  // 参数判断
  if (isNaN(req.params.articleNums) || isNaN(req.params.setoff))
    res.json({ code: 400, msg: "参数错误!" });
  else getArticleSection(req, res, req.params.articleNums, req.params.setoff);
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
