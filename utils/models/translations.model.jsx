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
        category: [{
            _id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }],
        addedBy: [{
            userId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            userType: {
                type: Number,
                required: true
            },
            username: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true
            }
        }]

    }, {
    timestamps: true
}
);

mongoose.models = {};

const model = mongoose.model("Translations", Translation);

module.exports = model;
