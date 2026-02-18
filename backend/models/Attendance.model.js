const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    punchIn: {
        type: Date,
    },
    punchOut: {
        type: Date,
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["present", "absent", "half-day", "leave"],
        default: "present",
    },
    notes: String,
}, { timestamps: true });

// Calculate total hours before saving
attendanceSchema.pre("save", function (next) {
    if (this.punchIn && this.punchOut) {
        const diff = this.punchOut.getTime() - this.punchIn.getTime();
        this.totalHours = Math.round((diff / (1000 * 60 * 60)) * 100) / 100;
    }
    next();
});

module.exports = mongoose.model("Attendance", attendanceSchema);
