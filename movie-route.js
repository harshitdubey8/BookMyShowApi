const express = require("express");
const MoviesModel = require("./models/movies-model");
const router = express.Router();

// Read All
router.get("/movies", async function (req, res) {
  let result = await MoviesModel.find();

  try {
    console.log(
      "[Read All] - No. of items get from database: " + result.length
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read Single
router.get("/movies/:id", async function (req, res) {
  const movieId = req.params.id;

  try {
    // Assuming movieId is the MongoDB document ID (_id)
    const movie = await MoviesModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    console.log("[Read Single] - " + JSON.stringify(movie));
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// Create
router.post("/movies", async function (req, res) {
  var movieObj = new MoviesModel(req.body);

  try {
    let newObj = await movieObj.save();

    var result = {};
    result.status = "Record inserted in Database";
    console.log("[Create] - Record inserted in Database");
    res.send(result);
  } catch (error) {
    console.error("[Create] - Error: " + error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Update
router.put("/movies/:id", async function (req, res) {
  try {
    const movieId = req.params.id;
    const movieObj = {
      movieTitle: req.body.movieTitle,
      movieDesc: req.body.movieDesc,
      genre: req.body.genre,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      posterUrl: req.body.posterUrl,
      type: req.body.type,
      cast: req.body.cast,
      rating: req.body.rating,
    };

    const resResult = await MoviesModel.findByIdAndUpdate(movieId, movieObj);

    if (resResult) {
      console.log("[Update] - Record updated in Database");
      return res.status(200).json({ message: "Record updated in Database" });
    } else {
      console.log("[Update] - Movie not found in Database");
      return res.status(404).json({ message: "Movie not found in Database" });
    }
  } catch (error) {
    console.error("[Update] - Error: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete
router.delete("/movies/:id", async function (req, res) {
  const movieId = req.params.id;

  try {
    const deletedMovie = await MoviesModel.findByIdAndDelete(movieId);

    if (deletedMovie) {
      console.log("[Delete] - Movie deleted from Database:", deletedMovie);
      res.json({ status: "Record deleted from Database" });
    } else {
      console.log("[Delete] - Movie not found in Database");
      res.status(404).send("Movie not found in Database");
    }
  } catch (error) {
    console.error("[Delete] - Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
