var express = require("express");
var { getArticleByID, getArticleSection } = require("../controller/article");
var router = express.Router();

// TODO 文章访问数量，依照次排序推荐列表 (api/article/visitorRead/文章ID)
router.get("/visitorRead/:articleID", (req, res, next) => {});

// TODO 返回完整的时间列表（api/article/timeline）
router.get("/timeline", (req, res, next) => {});

router.get("/:articleID", (req, res, next) => {
  // 按照文章 ID 查询
  console.log("文章 id 为:", req.params.articleID);
  getArticleByID(req, res, req.params.articleID);
});

router.get("/:articleNums/:setoff", (req, res, next) => {
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
