const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    assigneeName: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Done'],
        default: 'Pending',
    },
    dueDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
