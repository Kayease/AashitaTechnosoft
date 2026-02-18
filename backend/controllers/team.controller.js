const Team = require("../models/Team.model");

// @desc    Get all teams
// @route   GET /api/teams
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate("lead", "name email").populate("members", "name email");
        res.json({ success: true, count: teams.length, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create team
// @route   POST /api/teams
exports.createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update team
// @route   PUT /api/teams/:id
exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        res.json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
