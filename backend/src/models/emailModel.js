const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const RegisteredEmail = mongoose.model("Email", emailSchema);

module.exports = RegisteredEmail;
