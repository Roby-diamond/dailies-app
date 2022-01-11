const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const Daily = require("./models/daily");

require("dotenv").config();

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongodb not running?"));
db.on("connected", () => console.log("mongodb connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongodb disconnected"));

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

// Index
app.get("/dailies", (req, res) => {
  Daily.find({}, (err, dailies) => {
    res.render("index.ejs", { dailies });
  });
});

// New
app.get("/dailies/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
app.delete("/dailies/:id", (req, res) => {
  Daily.findByIdAndDelete(req.params.id, (err, daily) => {
    res.redirect("/dailies");
  });
});
// Update
app.put("/dailies/:id", (req, res) => {
  req.body.completed = !!req.body.completed;
  Daily.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (err, daily) => {
      res.redirect(`/dailies/${req.params.id}`);
    }
  );
});
// Create
app.post("/dailies", (req, res) => {
  req.body.completed = !!req.body.completed;
  Daily.create(req.body, (err, daily) => {
    res.redirect("/dailies");
  });
});

// Edit
app.get("/dailies/:id/edit", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    res.render("edit.ejs", { daily });
  });
});

// Show
app.get("/dailies/:id", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    res.render("show.ejs", { daily });
  });
});
app.listen(PORT, () => console.log(`express is listening on: ${PORT}`));
