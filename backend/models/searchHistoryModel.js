const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    searchedAt: {
        type: Date,
        default: Date.now // Automatically set the date when the search is recorded
    }
});

module.exports = mongoose.model("History", searchHistorySchema);
