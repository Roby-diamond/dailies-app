const express = require("express");
const dailiesRouter = express.Router();
const Daily = require("../models/daily");
const dailySeed = require("../models/dailySeed");

// Seed
dailiesRouter.get("/seed", (req, res) => {
  Daily.deleteMany({}, (err, dailies) => {});
  Daily.create(dailySeed, (err, dailies) => {
    res.redirect("/");
  });
});

// Index
dailiesRouter.get("/", (req, res) => {
  Daily.find({}, (err, dailies) => {
    res.render("index", { dailies });
  });
});

// New
dailiesRouter.get("/dailies/new", (req, res) => {
  res.render("new");
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
    res.render("edit", { daily });
  });
});

module.exports = dailiesRouter;
