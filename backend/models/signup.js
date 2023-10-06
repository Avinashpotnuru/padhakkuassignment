const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation for name (e.g., minimum length of 3 characters)
        return value.length >= 3;
      },
      message: "Name must be at least 3 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom validation for email (e.g., simple email format check)
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
