const Attendance = require("../models/Attendance.model");

// @desc    Punch in
// @route   POST /api/attendance/punch-in
exports.punchIn = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({
            user: req.user.id,
            date: today,
        });

        if (attendance && attendance.punchIn) {
            return res.status(400).json({ success: false, message: "Already punched in today" });
        }

        if (!attendance) {
            attendance = await Attendance.create({
                user: req.user.id,
                date: today,
                punchIn: new Date(),
            });
        } else {
            attendance.punchIn = new Date();
            await attendance.save();
        }

        res.json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Punch out
// @route   POST /api/attendance/punch-out
exports.punchOut = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            user: req.user.id,
            date: today,
        });

        if (!attendance || !attendance.punchIn) {
            return res.status(400).json({ success: false, message: "Please punch in first" });
        }

        if (attendance.punchOut) {
            return res.status(400).json({ success: false, message: "Already punched out today" });
        }

        attendance.punchOut = new Date();
        await attendance.save();

        res.json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get my attendance
// @route   GET /api/attendance/my
exports.getMyAttendance = async (req, res) => {
    try {
        const { month, year } = req.query;
        const startDate = new Date(year || new Date().getFullYear(), (month || new Date().getMonth()) - 1, 1);
        const endDate = new Date(year || new Date().getFullYear(), month || new Date().getMonth(), 0);

        const attendance = await Attendance.find({
            user: req.user.id,
            date: { $gte: startDate, $lte: endDate },
        }).sort("date");

        res.json({ success: true, count: attendance.length, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all attendance (admin)
// @route   GET /api/attendance
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("user", "name email")
            .sort("-date");
        res.json({ success: true, count: attendance.length, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
