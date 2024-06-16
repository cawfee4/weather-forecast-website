const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const api = require("./src/api/index");
const db = require("./src/config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

db();

app.use("/api", api);
app.get("/", (req, res) => {
  res.send("Welcome to weather-forecast-website API");
});

app.listen(PORT, () => {
  console.log(`weather-forecast-website listening on port ${PORT}`);
});

// Export the app for Vercel
module.exports = (req, res) => {
  app(req, res);
};
