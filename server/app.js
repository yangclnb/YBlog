const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const urlRouter = require("./routes/api");

var app = express();

// 全局解决跨域问题
// const corsOptions = {
//   credentials: true, //允许客户端携带验证信息
//   origin: (origin, callback) => {
//     if (origin) return callback(null, true);
//     callback(new Error("Not allowed by CORS"));
//   },
// };
// app.use(cors(corsOptions));
app.use(cors());


// 加入这个配置,就可以在请求对象req中得到req.body,并通过req.body来获取post请求,请求体内容
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 挂载路由
app.use("/api", urlRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({
    code: 403,
    message: "error",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("err :>> ", err);
  res.json({
    code: 403,
    message: "error",
  });
});

module.exports = app;
