const mongoose = require("mongoose");

const Lang = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    }
);

mongoose.models = {};

const model = mongoose.model("Langs", Lang);

module.exports = model;
