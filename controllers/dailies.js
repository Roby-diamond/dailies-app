const express = require("express");
const dailiesRouter = express.Router();

// const Daily = require("../models/daily");
// const dailySeed = require("../models/dailySeed");

// Index
dailiesRouter.get("/", (req, res) => {
  res.render("index.ejs");
});
