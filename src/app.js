const express = require("express");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const app = express();

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);

module.exports = app;
