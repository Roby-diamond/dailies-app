const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const dailiesController = require("./controllers/dailies");
const app = express();

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

app.use("/dailies", dailiesController);

app.listen(PORT, () => console.log(`express is listening on: ${PORT}`));
