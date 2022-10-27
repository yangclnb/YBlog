const { query } = require("../db/mysqlConnectPool");
const express = require("express");
const { escape } = require("mysql");

/**
 * @function getCurrentArticleComment
 * @description: 获取当掐文章的所有评论
 * @return {Number} ArticleID
 * @author: Banana
 */
function getCurrentArticleComment(ArticleID, req, res) {
  query(
    `select * from comment where blogId = ?`,
    [ArticleID],
    (err, results) => {
      if (err) throw err;
      res.json({ code: 200, data: results });
    }
  );
}

/**
 * @function setCurrentArticleComment
 * @description: 设置当前评论的内容，防止sql注入
 * @param {Number} articleID
 * @param {String} userAddress
 * @param {String} userName
 * @param {String} comment
 * @author: Banana
 */
function setCurrentArticleComment(
  res,
  articleID,
  userAddress,
  userName,
  comment
) {
  // console.log(res, articleID, userAddress, userName, comment);
  query(
    `INSERT INTO comment VALUES (null, ${articleID}, ?, ?, ?, now());`,
    [escape(userName), userAddress, escape(comment)],
    (err) => {
      if (err) res.json({ code: 404, data: "comment failed" });
      else res.json({ code: 200, data: "add success!" });
    }
  );
}

/**
 * @function deleteCurrentArticleComment
 * @description: 根据评论ID删除该条评论
 * @param {Number} commentID
 * @author: Banana
 */
function deleteCurrentArticleComment(commentID) {}

module.exports = { getCurrentArticleComment, setCurrentArticleComment };
