const Class = require("../models/Class");

const getClasses = async (req, res) => {

  try {

    const classes =
      await Class.find();

    res.json(classes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const addClass = async (req, res) => {

  try {

    const newClass =
      await Class.create(req.body);

    res.status(201).json(
      newClass
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updateClass = async (
  req,
  res
) => {

  try {

    const updatedClass =
      await Class.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedClass);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteClass = async (
  req,
  res
) => {

  try {

    await Class.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Class deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getClasses,
  addClass,
  updateClass,
  deleteClass
};