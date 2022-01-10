require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongodb not running?"));
db.on("connected", () => console.log("mongodb connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongodb disconnected"));

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

// Index
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => console.log("express is listening on:", PORT));
