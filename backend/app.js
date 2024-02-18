const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const products = require("./routes/product");
const appointments = require("./routes/appointment");
const locations = require("./routes/location");
const announcements = require("./routes/announcement");
const equipments = require("./routes/equipment");
const settings = require("./routes/settings");
const sports = require("./routes/sport");
const categories = require("./routes/category");
const borrows = require("./routes/borrow");
const auth = require("./routes/auth");
const order = require("./routes/order");
const errorMiddleware = require("./middlewares/errors");

app.use(express.json({ limit: "100mb" }));

app.use(
  cors({
    origin: [
      "https://mern-scheduler-frontend.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Custom middleware to set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or set it to the specific origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", appointments);
app.use("/api/v1", locations);
app.use("/api/v1", settings);
app.use("/api/v1", announcements);
app.use("/api/v1", equipments);
app.use("/api/v1", sports);
app.use("/api/v1", categories);
app.use("/api/v1", borrows);

app.use(errorMiddleware);

module.exports = app;
