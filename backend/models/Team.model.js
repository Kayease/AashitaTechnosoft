const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a team name"],
        trim: true,
    },
    description: String,
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
