const Attendance =
require("../models/Attendance");

const addAttendance =
async (req, res) => {

  try {

    const attendance =
      await Attendance.create({

        teacherId:
          req.user.id,

        studentName:
          req.body.studentName,

        date:
          req.body.date,

        status:
          req.body.status
      });

    res.status(201).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getAttendance =
async (req, res) => {

  try {

    const attendance =
      await Attendance.find({

        teacherId:
          req.user.id
      });

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updateAttendance =
async (req, res) => {

  try {

    const attendance =
      await Attendance.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteAttendance =
async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
      "Attendance Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
};