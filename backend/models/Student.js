const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  rollNo: {
    type: String,
    required: true
  },

  className: {
    type: String,
    required: true
  }

},
{
  timestamps: true
})

module.exports =
mongoose.model(
  "Student",
  studentSchema
)