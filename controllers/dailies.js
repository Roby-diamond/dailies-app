const express = require("express");
const dailiesRouter = express.Router();
const Daily = require("../models/daily");

// Index
dailiesRouter.get("/", (req, res) => {
  Daily.find({}, (err, dailies) => {
    res.render("index.ejs", { dailies });
  });
});

// New
dailiesRouter.get("/dailies/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
dailiesRouter.delete("/dailies/:id", (req, res) => {
  Daily.findByIdAndDelete(req.params.id, (err, daily) => {
    res.redirect("/");
  });
});
// Update
dailiesRouter.put("/dailies/:id", (req, res) => {
  req.body.completed = !!req.body.completed;
  Daily.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (err, daily) => {
      res.redirect("/");
    }
  );
});
// Create
dailiesRouter.post("/dailies", (req, res) => {
  req.body.completed = !!req.body.completed;
  Daily.create(req.body, (err, daily) => {
    res.redirect("/");
  });
});

// Edit
dailiesRouter.get("/dailies/:id/edit", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    res.render("edit.ejs", { daily });
  });
});

module.exports = dailiesRouter;
