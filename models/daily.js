const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailySchema = new Schema(
  {
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Daily", dailySchema);
