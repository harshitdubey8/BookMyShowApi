const express = require("express");
const TheaterModel = require("./models/theater-model");
const router = express.Router();

// Get all theatre
router.get("/theatre", async function (req, res) {
  let result = await TheaterModel.find();

  try {
    console.log(
      "[Read All] - No. of  items get from database : " + result.length
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single data for the theatre
router.get("/theatre/:id", async function (req, res) {
  var theaterId = req.params.id;
  try {
    let result = await TheaterModel.findById(theaterId);
    if (!result) {
      return res.status(404).json({ message: "Theater not found" });
    }
    console.log("[Read Single] - " + JSON.stringify(result));
    res.json(result);
  } catch (error) {
    console.error("Error fetching theater:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.post("/theatre", async function (req, res) {
  var theatreObj = new TheaterModel(req.body);

  try {
    let newObj = await theatreObj.save();

    var result = {};
    result.status = "Record inserted in Database";
    console.log("[Create] - Record inserted in Database");
    res.send(result);
  } catch (error) {
    console.error("[Create] - Error: " + error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/theatre/:id", async function (req, res) {
  var theaterId = req.params.id;
  try {
    let resResult = await TheaterModel.findOneAndDelete({ _id: theaterId });

    if (resResult) {
      var result = {};
      result.status = "Record deleted from Database";
      console.log("[Delete] - Record deleted from Database");
      res.send(result);
    } else {
      console.log("[Delete] - Theater not found in Database");
      res.status(404).send("Theater not found in Database");
    }
  } catch (error) {
    console.error("[Delete] - Error: " + error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
