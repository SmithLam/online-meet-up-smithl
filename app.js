var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var expRouter = require("./routes/experiences");
var reviewRouter = require("./routes/review");
const mongoose = require("mongoose");
const { stack } = require("./routes/users");
require("dotenv").config();

mongoose
  .connect(process.env.DB, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/experiences", expRouter);
app.use("/experiences/:expID", reviewRouter);

app.route("*").all(function (req, res, next) {
  next(new AppError(404, "Route not found")); //go straight to the middleware
});

// error handler
const errorController = require("./utils/errorController");
app.use(errorController);

module.exports = app;
