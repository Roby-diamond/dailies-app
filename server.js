const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");

const dailiesController = require("./controllers/dailies");

const app = express();

require("dotenv").config();

const { PORT, MONGODB_URI, SECRET } = process.env;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongodb not running?"));
db.on("connected", () => console.log("mongodb connected"));
db.on("disconnected", () => console.log("mongodb disconnected"));

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", dailiesController);

app.listen(PORT, () => console.log(`express is listening on: ${PORT}`));
