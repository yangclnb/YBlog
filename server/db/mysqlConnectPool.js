var mysql = require("mysql");
var pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "123456",
  database: "yblog",
  connectionLimit: 0,
}); //创建一个pool连接池

/**
 * @function query
 * @description: 封装数据连接池
 * @param {String} sql sql语句
 * @param {Array} params 参数Arr
 * @param {Function} callback
 * @author: Banana
 */
function query(sql, params = [], callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err, null);
    } else {
      connection.query(sql, params, function (err, results) {
        connection.release(); //释放连接回连接池
        callback(err, results); //结果回调
      });
    }
  });
}

module.exports = { query };
