const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/BookMyShow");

var Schema = mongoose.Schema;

var TheaterModelSchema = new Schema(
  {
    theatreName: { type: String },
    theatreLocation: { type: String },
    moviePrices: { type: String },
  },
  { versionKey: false }
);

var TheaterModel = mongoose.model("theater", TheaterModelSchema);

// Exporting Theatre
module.exports = TheaterModel;
