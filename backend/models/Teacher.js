const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    subject: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    classes: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    teacherId: {
      type: String,
      default: "",
    },

    joiningDate: {
      type: String,
      default: "",
    },

    studentsHandled: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Teacher",
  teacherSchema
);