const express =
require("express");

const protect =
require("../middleware/authMiddleware");

const {

  addAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance

} = require(
  "../controllers/attendanceController"
);

const router =
express.Router();

router.post(
  "/",
  protect,
  addAttendance
);

router.get(
  "/",
  protect,
  getAttendance
);

router.put(
  "/:id",
  protect,
  updateAttendance
);

router.delete(
  "/:id",
  protect,
  deleteAttendance
);

module.exports =
router;