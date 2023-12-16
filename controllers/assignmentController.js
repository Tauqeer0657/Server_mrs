// controllers/assignmentController.js
const Assignment = require('../models/assignmentModel');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.send(assignments);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAssignmentCodes = async (req, res) => {
  try {
    const codes = await Assignment.find().select('code');
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLatestAssignmentCode = async (req, res) => {
  try {
    const latestAssignment = await Assignment.findOne().sort({ code: -1 });

    if (!latestAssignment) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    res.json({ code: latestAssignment.code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLatestAssignmentEmployeeId = async (req, res) => {
  try {
    const latestAssignmentemp = await Assignment.findOne().sort({ employee_id: -1 });

    if (!latestAssignmentemp) {
      return res.status(404).json({ message: 'No assignments found' });
    }

    res.json({ employee_id: latestAssignmentemp.employee_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentDetailsByEmployeeId = async (req, res) => {
  try {
    const employee_id = req.params.employee_id;
    const assignmentDetails = await Assignment.findOne({ employee_id: employee_id });

    if (!assignmentDetails) {
      return res.status(404).send();
    } else {
      res.send(assignmentDetails);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateAssignment = await Assignment.findByIdAndUpdate({ _id: _id }, req.body, { new: true });
    res.send(updateAssignment);
  } catch (error) {
    res.status(400).send();
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteAssignment = await Assignment.findByIdAndDelete({ _id: _id });
    res.send(deleteAssignment);
  } catch (error) {
    res.status(500).send(error);
  }
};
