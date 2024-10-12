const mongoose = require('mongoose');

const SCHEDULESCHEMA = new mongoose.Schema({
    scheduleingDay: { type: String, default: null },
    event: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('schedule-task', SCHEDULESCHEMA);