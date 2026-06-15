const Assignment =
require("../models/Assignment");
const path = require("path");
const addAssignment =
async (req, res) => {
console.log("BODY:", req.body);
console.log("FILE:", req.file);
  try {

    const assignment =
      await Assignment.create({

        teacherId:
          req.user.id,

        title:
          req.body.title,

        description:
          req.body.description,

        dueDate:
          req.body.dueDate,

        dueTime:
          req.body.dueTime,

        pdfFile:
          req.file
            ? req.file.filename
            : "",

        status:
          req.body.status
      });

    res.status(201).json(
      assignment
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getAssignments =
async (req, res) => {

  try {

    const assignments =
      await Assignment.find({

        teacherId:
          req.user.id
      });

    res.status(200).json(
      assignments
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updateAssignment =
async (req, res) => {

  try {

    const assignment =
      await Assignment.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    res.status(200).json(
      assignment
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteAssignment =
async (req, res) => {

  try {

    await Assignment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
      "Assignment Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addAssignment,
  getAssignments, 
  updateAssignment,
  deleteAssignment
};