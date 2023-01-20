const mongoose = require("mongoose");

const Translation = new mongoose.Schema(
    {
        default: {
            type: Boolean,
        },
        englishPhrase: {
            type: String,
            required: true
        },
        englishPhraseAudio: {
            type: String,
            required: true
        },
        howToSay: {
            type: String,
            required: true
        },
        howToSayAudio: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }, {
    timestamps: true
}
);

mongoose.models = {};

const model = mongoose.model("Translations", Translation);

module.exports = model;
