const mongoose = require("mongoose");

const assignmentSchema =
new mongoose.Schema(

  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    dueDate: {
      type: String,
      required: true
    },

    dueTime: {
      type: String,
      default: ""
    },
    pdfFile: {
  type: String,
  default: ""
},
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }
  },

  {
    timestamps: true
  }
);

module.exports =
mongoose.model(
  "Assignment",
  assignmentSchema
);