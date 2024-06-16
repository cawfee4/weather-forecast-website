const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongo_url = process.env.MONGO_URL;
const db = async () => {
  try {
    const con = await mongoose.connect(mongo_url);
    console.log(`MongoDB connected successfuly`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
