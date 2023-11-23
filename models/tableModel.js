const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  tableno: {
      type: Number,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
  time: {
      type: String,
      required: true
  }
});
const collection = mongoose.model("tables", bookingSchema);

module.exports = collection;
