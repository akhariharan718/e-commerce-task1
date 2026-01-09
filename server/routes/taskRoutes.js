const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:projectId', taskController.getTasksByProject);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
