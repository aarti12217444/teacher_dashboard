const express = require("express");

const protect =
require("../middleware/authMiddleware");
const upload =
require("../middleware/upload");
const {

  addAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment

} = require(
  "../controllers/assignmentController"
);

const router =
express.Router();

router.post(
  "/",
  protect,
  upload.single("pdfFile"),
  addAssignment
);

router.get(
  "/",
  protect,
  getAssignments
);

router.put(
  "/:id",
  protect,
  upload.single("pdfFile"),
  updateAssignment
);

router.delete(
  "/:id",
  protect,
  deleteAssignment
);

module.exports =
router;