const express = require("express");
const app = express();
const connectDatabase = require("./config/database");
const path = require("path");
const cloudinary = require("cloudinary");

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDatabase();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

app.get("/", (req, res) => {
  res.send("Server Online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
