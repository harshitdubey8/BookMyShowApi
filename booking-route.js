const express = require("express");
const BookingModel = require("./models/bookings-model");
const router = express.Router();

// API route to book a movie
router.post("/bookings", async (req, res) => {
  try {
    const { userId, movieId, theatreId, seats, grandTotal } = req.body;

    const newBooking = new BookingModel({
      userId,
      movieId,
      theatreId,
      seats,
      grandTotal,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    console.error("Error while booking:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    // Find all bookings in the database
    const allBookings = await BookingModel.find()
      .populate("userId")
      .populate("movieId")
      .populate("theatreId");

    // Send all bookings as response
    res.status(200).json(allBookings);
  } catch (error) {
    // Send error response if an error occurs
    console.error("[Get All Bookings] - Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/bookings/:userId", async (req, res) => {
  const userId = req.params.userId; // Access userId from route parameters
  try {
    // Find all bookings in the database with the provided userId
    const bookings = await BookingModel.find({ userId })
      .populate("userId")
      .populate("movieId")
      .populate("theatreId");

    // Send the bookings as response
    res.status(200).json(bookings);
  } catch (error) {
    // Send error response if an error occurs
    console.error("[Get Bookings by UserID] - Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
module.exports = router;
