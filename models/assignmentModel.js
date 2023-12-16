// models/AssignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  code : {
    type : String,
    required : true,
    unique : true
  },
  employee_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Registration",
    required : true,
  },
  assignment: {
    type : String,
    required : true
  },
  from: {
    type : String,
    required : true
  },
  to: {
    type : String,
    required : true
  },
  assign_date:  {
    type : Date,
    required : true
  },
  deadline_date:  {
    type : Date,
    required : true
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
