const express = require("express");

const {
  getClasses,
  addClass,
  updateClass,
  deleteClass
} = require(
  "../controllers/classController"
);

const router =
  express.Router();

router.get("/", getClasses);

router.post("/", addClass);

router.put(
  "/:id",
  updateClass
);

router.delete(
  "/:id",
  deleteClass
);

module.exports = router;