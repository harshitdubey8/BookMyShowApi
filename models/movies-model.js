//Import  Mongoose Module
const mongoose = require("mongoose");

// Connect to Mongodb  database(testDb is database name)
mongoose.connect("mongodb://127.0.0.1:27017/BookMyShow");

// Create  schema
var Schema = mongoose.Schema;

// Schema properties should be match mongodb collection properties
var MoviesModelSchema = new Schema(
  {
    movieTitle: { type: String, required: true },
    movieDesc: { type: String },
    genre: { type: String, required: true }, // Action Triller Horror Drama Romantic

    duration: { type: Number },
    releaseDate: { type: String },
    posterUrl: { type: String },
    type: { type: String },
    // Upcoming Trending Recommended
    rating: { type: Number }, // 1 - 5
    cast: { type: [String] },
  },

  { versionKey: false }
);

// Create Model Object
// "student"   --- collection name in mongodb
var MoviesModel = mongoose.model("movie", MoviesModelSchema);

// Exporting MoviesModel
module.exports = MoviesModel;
