const mongoose = require('mongoose');

const ADDTASK = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: Array, required: true },
    tagName: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('AddTask', ADDTASK);