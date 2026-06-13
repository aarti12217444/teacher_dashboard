const mongoose = require("mongoose");

const attendanceSchema =
new mongoose.Schema(

  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },

    studentName: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true
    }
  },

  {
    timestamps: true
  }
);

module.exports =
mongoose.model(
  "Attendance",
  attendanceSchema
);