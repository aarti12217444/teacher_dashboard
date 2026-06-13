const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    roomNumber: {
      type: String,
      required: true
    },

    schedule: {
      type: String,
      required: true
    },

    sessionDate: {
      type: String,
      default: ""
    },

    sessionTime: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Class",
  classSchema
);