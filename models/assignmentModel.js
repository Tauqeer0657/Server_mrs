// models/AssignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  code : {
    type : String,
    required : true,
    unique : true
  },
  employee_id : {
    type : String,
    required : true
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
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'progress'],
    default: 'pending',
    required: true,
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
