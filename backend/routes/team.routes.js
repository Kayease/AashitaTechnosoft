const express = require("express");
const router = express.Router();
const { getTeams, createTeam, updateTeam, deleteTeam } = require("../controllers/team.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.use(protect);

router.route("/").get(getTeams).post(authorize("admin"), createTeam);
router.route("/:id").put(authorize("admin"), updateTeam).delete(authorize("admin"), deleteTeam);

module.exports = router;
