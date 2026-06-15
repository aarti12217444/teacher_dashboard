const Teacher =
require("../models/Teacher");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

  service: "gmail",

  auth: {

    user:
      process.env.EMAIL_USER,
      

    pass:
      process.env.EMAIL_PASS
      
  }
});


transporter.verify(
  (error, success) => {

    if (error) {

      console.log(
        "MAIL ERROR:",
        error
      );

    } else {

      console.log(
        "Mail Server Ready"
      );
    }
  }
);





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

const forgotPassword =
async (req, res) => {

  try {

    const { email } =
      req.body;

    const teacher =
      await Teacher.findOne({
        email
      });

    if (!teacher) {

      return res.status(404)
        .json({

          message:
          "Email not found"
        });
    }
    
    const otp =
      Math.floor(
        100000 +
        Math.random() *
        900000
      ).toString();

    teacher.otp = otp;

    teacher.otpExpires =
      Date.now() +
      10 * 60 * 1000;

    await teacher.save();

    

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Password Reset OTP",

      text:
        `Your OTP is ${otp}`
    });

    res.status(200).json({

      message:
      "OTP sent successfully"
    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });
  }
};

const verifyOtp =
async (req, res) => {

  try {

    const {
      email,
      otp
    } = req.body;

    const teacher =
      await Teacher.findOne({
        email
      });

    if (
      !teacher ||
      teacher.otp !== otp
    ) {

      return res.status(400)
        .json({

          message:
          "Invalid OTP"
        });
    }

    if (
      teacher.otpExpires <
      Date.now()
    ) {

      return res.status(400)
        .json({

          message:
          "OTP Expired"
        });
    }

    res.status(200).json({

      message:
      "OTP Verified"
    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });
  }
};

const resetPassword =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const teacher =
      await Teacher.findOne({
        email
      });

    if (!teacher) {

      return res.status(404)
        .json({

          message:
          "Teacher not found"
        });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    teacher.password =
      hashedPassword;

    teacher.otp = "";
    teacher.otpExpires = null;

    await teacher.save();

    res.status(200).json({

      message:
      "Password Updated"
    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });
  }
};

module.exports = {
  registerTeacher,
  loginTeacher,
  updateProfile,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword
};