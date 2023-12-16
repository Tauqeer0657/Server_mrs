// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAllAssignments);
router.get('/assignment-codes', assignmentController.getAssignmentCodes);
router.get('/latest-assignment-code', assignmentController.getLatestAssignmentCode);
router.get('/latest-assignment-employeeid', assignmentController.getLatestAssignmentEmployeeId);
router.get('/:employee_id', assignmentController.getAssignmentDetailsByEmployeeId);
router.patch('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;
