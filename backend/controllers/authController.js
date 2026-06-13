const Teacher = require("../models/Teacher")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerTeacher = async (req, res) => {

  try {

    const {
      name,
      email,
      subject,
      password
    } = req.body

    const teacherExists =
      await Teacher.findOne({ email })

    if (teacherExists) {

      return res.status(400).json({
        message: "Teacher already exists"
      })
    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const teacher =
      await Teacher.create({

        name,
        email,
        subject,

        password: hashedPassword
      })

    res.status(201).json({
      message: "Teacher Registered",
      teacher
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

const loginTeacher = async (req, res) => {

  try {

    const { email, password } = req.body

    const teacher =
      await Teacher.findOne({ email })

    if (!teacher) {

      return res.status(400).json({
        message: "Invalid Email"
      })
    }

    const isMatch =
      await bcrypt.compare(
        password,
        teacher.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      })
    }

    const token = jwt.sign(

      {
        id: teacher._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    )

    res.status(200).json({

      message: "Login Successful",

      token,

      teacher: {

        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject
      }
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}
const updateProfile = async (req, res) => {

  try {

    const teacher =
      await Teacher.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    res.status(200).json(
      teacher
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};
const getProfile = async (req, res) => {

  try {

    const teacher =
      await Teacher.findById(
        req.params.id
      );

    res.status(200).json(
      teacher
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerTeacher,
  loginTeacher,
  updateProfile,
  getProfile

}