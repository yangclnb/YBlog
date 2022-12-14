const { query } = require("../db/mysqlConnectPool");
const express = require("express");

/**
 * @function getAllArticle
 * @description: 读取发送所有的文章
 * @return {void}
 * @author: Banana
 */
function getAllArticle(req, res) {
  query(
    "select * from blog b INNER JOIN type t on t.typeId = b.typeId",
    (err, results) => {
      if (err) throw err;
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function getArticalNums
 * @description: 获取数据库中博客的数量
 * @return {*}
 * @author: Banana
 */
function getArticalNums(req, res) {
  query("SELECT COUNT(blogId) nums FROM blog", (err, results) => {
    if (err) throw err;
    res.setHeader("Cache-Control", "max-age=3600");
    res.json({ code: 200, data: results });
  });
}

/**
 * @function getVisitorData
 * @description: 获取过去七天的访问数据
 * @return {*}
 * @author: Banana
 */
function getVisitorData(req, res) {
  query(
    `SELECT LEFT ( pubtime, 10 ) time, 
  COUNT( blogid ) count 
  FROM visitor GROUP BY LEFT ( pubtime, 10 ) 
  DESC LIMIT 0,7`,
    [],
    (err, results) => {
      if (err) throw err;
      res.setHeader("Cache-Control", "max-age=3600");
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function: getAllVisitorAmount
 * @description: 获取总体访问数量
 * @return {*}
 * @author: Banana
 */
function getAllVisitorAmount(req, res) {
  query("SELECT COUNT(visitorId) amount from visitor", [], (err, results) => {
    if (err) throw err;
    res.setHeader("Cache-Control", "max-age=3600");
    res.json({ code: 200, data: results });
  });
}

/**
 * @function getArticleByID
 * @description: 根据 ID 返回对应的文章
 * @param {Number} articalID 文章ID
 * @return {Array} results
 * @author: Banana
 */
function getArticleByID(req, res, articalID) {
  query(
    "select * from blog b INNER JOIN type t on t.typeId = b.typeId where blogId = ?",
    [articalID],
    (err, results) => {
      if (err) throw err;
      // 返回数据
      res.setHeader("Cache-Control", "max-age=3600");
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function getArticleSection
 * @description: 根据 返回数量和偏移量 获取文章列表
 * @param {Number} resultNums 返回数量
 * @param {Number} offset 偏移量
 * @author: Banana
 */
function getArticleSection(req, res, resultNums, offset) {
  query(
    "select * from blog  b INNER JOIN type t on t.typeId = b.typeId ORDER BY pubtime DESC limit ?,?",
    [parseInt(offset), parseInt(resultNums)],
    (err, results) => {
      if (err) throw err;
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function:
 * @description: 根据文章发布时间排序
 * @param {*} req
 * @param {*} res
 * @return {*}
 * @author: Banana
 */
function getArticleTotalTimeLine(req, res) {
  query(
    "select pubtime,title from blog ORDER BY pubtime DESC",
    [],
    (err, results) => {
      if (err) throw err;
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function addVisitorInfo
 * @description: 在文章阅读列表中添加当前ID的博客访问信息
 * @param {*} req
 * @param {*} res
 * @param {*} blogID
 * @param {*} ipAddress
 * @return {*}
 * @author: Banana
 */
function addVisitorInfo(req, res, blogID, ipAddress) {
  query(
    "insert into visitor values (null,now(),?,?)",
    [ipAddress, blogID],
    (err) => {
      if (err) throw err;
      res.json({ code: 200, data: "add success!" });
    }
  );
}

/**
 * @function getArticalByVisitorInfo
 * @description: 通过文章访问量返回推荐列表
 * @param {*} res
 * @param {*} req
 * @return {*}
 * @author: Banana
 */
function getArticalByVisitorInfo(req, res) {
  query(
    `select v.blogid , COUNT(v.blogid) num,b.title 
  from visitor v INNER JOIN blog b ON v.blogid = b.blogId 
  GROUP BY v.blogid ORDER BY num DESC LIMIT 0,7`,
    [],
    (err, results) => {
      if (err) throw err;
      res.setHeader("Cache-Control", "max-age=3600");
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function addarticle
 * @description: 添加文章
 * @param {String} title 文章标题
 * @param {String} article 文章内容
 * @param {Number} typeID 文章类型ID
 * @param {Time} createTime 创建文章的时间
 * @return {*}
 * @author: Banana
 */
function addarticle(title, article, typeID, createTime) {}

/**
 * @function updateArticle
 * @description: 根据文章ID更改文章内容
 * @param {Number} articleID 文章ID
 * @param {*} title 更改的内容
 * @param {*} article 更改的内容
 * @return {*}
 * @author: Banana
 */
function updateArticle(articleID, title, article) {}

module.exports = {
  getAllArticle,
  getArticalNums,
  getArticleByID,
  getArticalByVisitorInfo,
  getArticleSection,
  getArticleTotalTimeLine,
  addarticle,
  addVisitorInfo,
  updateArticle,
  getVisitorData,
  getAllVisitorAmount,
};
