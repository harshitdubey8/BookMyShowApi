const express = require("express");
const reviewModel = require("./models/reviews-model");
const router = express.Router();

router.post("/reviews/add", async function (req, res) {
  try {
    const { message, userId, movieId } = req.body;

    // Create a new review instance
    const newReview = new reviewModel({
      message: message,
      userId: userId,
      movieId: movieId,
    });

    // Save the new review to the database
    await newReview.save();

    // Send success response
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    // Send error response if an error occurs
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

module.exports = router;
