const mongoose = require("mongoose");

const Category = new mongoose.Schema(
    {
        es: [{
            name: {
                type: String,
                required: true
            }
        }],
        en: [{
            name: {
                type: String,
                required: true
            }
        }]
    }, {
    timestamps: true
}
);

mongoose.models = {};

const model = mongoose.model("Categories", Category);

module.exports = model;
