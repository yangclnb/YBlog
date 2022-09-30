const { query } = require("../db/mysqlConnectPool");
const express = require("express");

/**
 * @function getCurrentArticleComment
 * @description: 获取当掐文章的所有评论
 * @return {Number} ArticleID
 * @author: Banana
 */
function getCurrentArticleComment(ArticleID, req, res) {
  query(`select * from comment where blogId = ?`, [ArticleID], (err, results) => {
    if (err) throw err;
    res.json({ code: 200, data: results });
  });
}

/**
 * @function setCurrentArticleComment
 * @description: 设置当前评论的内容
 * @param {Number} commentID
 * @param {String} newComment
 * @author: Banana
 */
function setCurrentArticleComment(commentID, newComment) {}

/**
 * @function deleteCurrentArticleComment
 * @description: 根据评论ID删除该条评论
 * @param {Number} commentID
 * @author: Banana
 */
function deleteCurrentArticleComment(commentID) {}

module.exports = { getCurrentArticleComment };
