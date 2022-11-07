const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

const model = mongoose.model("UserDatas", User);

module.exports = model;
