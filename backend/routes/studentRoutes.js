const express =
require("express")

const protect =
require("../middleware/authMiddleware")

// const {
//   addStudent
// } =
// require("../controllers/studentController")

const {

  addStudent,
  getStudents,
  deleteStudent,
  updateStudent

} = require(
  "../controllers/studentController"
)

const router =
express.Router()

router.post(
  "/",
  protect,
  addStudent
)

router.get(
  "/",
  protect,
  getStudents
)

router.delete(
  "/:id",
  protect,
  deleteStudent
)

router.put(
  "/:id",
  protect,
  updateStudent
)

module.exports =
router