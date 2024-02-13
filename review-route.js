const express = require("express");
const reviewModel = require("./models/reviews-model");
const router = express.Router();

router.post("/reviews/add", async function (req, res) {
  try {
    const { message, userId, movieId, userRating } = req.body;

    // Create a new review instance
    const newReview = new reviewModel({
      message,
      userId,
      movieId,
      userRating,
    });

    // Save the new review to the database
    await newReview.save();

    // Send success response
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("[Add Review] - Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/reviews", async function (req, res) {
  try {
    // Find all reviews in the database
    const allReviews = await reviewModel
      .find()
      .populate("userId")
      .populate("movieId");

    // Send all reviews as response
    res.status(200).json(allReviews);
  } catch (error) {
    // Send error response if an error occurs
    console.error("[Get All Reviews] - Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// Get reviews based on movieID
router.get("/reviews/:movieId", async function (req, res) {
  const movieId = req.params.movieId;
  try {
    // Find reviews for the specified movie ID
    const reviews = await reviewModel
      .find({ movieId: movieId })
      .populate("userId");

    // Send the reviews as response
    res.status(200).json(reviews);
  } catch (error) {
    console.error("[Get Reviews] - Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
