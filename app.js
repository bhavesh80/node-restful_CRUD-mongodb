const express = require("express");

const app = express();

const db = require('./db');

const userController = require("./user/UserController");
app.use('/users',userController);

module.exports = app;
