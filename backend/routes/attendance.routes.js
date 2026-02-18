const express = require("express");
const router = express.Router();
const { punchIn, punchOut, getMyAttendance, getAllAttendance } = require("../controllers/attendance.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.use(protect);

router.post("/punch-in", punchIn);
router.post("/punch-out", punchOut);
router.get("/my", getMyAttendance);
router.get("/", authorize("admin"), getAllAttendance);

module.exports = router;
