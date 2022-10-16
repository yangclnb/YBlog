let { query } = require("../db/mysqlConnectPool");
const express = require("express");

function getFriend(req, res) {
  query("select * from friendChain", [], (err, results) => {
    if (err) throw err;
    res.setHeader('Cache-Control', 'max-age=3600');
    res.json({ code: 200, data: results });
  });
}

module.exports = {
  getFriend,
};
