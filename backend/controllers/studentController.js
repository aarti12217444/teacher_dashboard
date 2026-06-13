const Student =
require("../models/Student")

const addStudent =
async (req, res) => {

  try {

    const student =
      await Student.create({

        teacherId:
          req.user.id,

        name:
          req.body.name,

        rollNo:
          req.body.rollNo,

        className:
          req.body.className
      })

    res.status(201).json(student)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

const getStudents = async (req, res) => {

  try {

    const students =
      await Student.find({

        teacherId:
          req.user.id
      })

    res.status(200).json(
      students
    )

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    })
  }
}
const deleteStudent = async (req, res) => {

  try {

    const student =
      await Student.findByIdAndDelete(
        req.params.id
      )

    res.status(200).json({
      message: "Student Deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}
const updateStudent = async (req, res) => {

  try {

    const student =
      await Student.findByIdAndUpdate(

        req.params.id,

        {
          name: req.body.name,
          rollNo: req.body.rollNo,
          className: req.body.className
        },

        {
          new: true
        }
      )

    res.status(200).json(student)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  addStudent,getStudents,deleteStudent,updateStudent
}