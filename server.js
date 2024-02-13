const express = require("express");
const cors = require("cors");

const userRouter = require("./user-route");
const movieRouter = require("./movie-route");
const theatreRouter = require("./theater-route");
const reviewRouter = require("./review-route");
const bookingRouter = require("./booking-route");

const app = express();
const port = 80;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", movieRouter);
app.use("/api", theatreRouter);
app.use("/api", reviewRouter);
app.use("/api", bookingRouter);

app.get("/", function (req, res) {
  res.send("Welcome to Express JS API Application");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
