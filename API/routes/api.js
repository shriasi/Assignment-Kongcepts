var express = require("express");
var authRouter = require("./auth");
var bankRouter = require("./bank");
var employeeRouter = require("./employee");
var branchRouter = require("./branch");

var app = express();

app.use("/auth/", authRouter);
app.use("/bank/", bankRouter);
app.use("/employee/", employeeRouter);
app.use("/branch/", branchRouter);

module.exports = app;