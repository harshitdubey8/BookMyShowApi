//Import  Mongoose Module
const mongoose = require("mongoose");

// Connect to Mongodb  database(testDb is database name)
mongoose.connect("mongodb://127.0.0.1:27017/BookMyShow");

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properties
var reviewsModelSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
  },

  { versionKey: false }
);

// Create Model Object
// "review"   --- collection name in mongodb
var ReviewModel = mongoose.model("review", reviewsModelSchema);

// Exporting ReviewModel
module.exports = ReviewModel;
