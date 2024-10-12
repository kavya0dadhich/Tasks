const mongoose = require('mongoose');

const SONGADDED = new mongoose.Schema({
    url: { type: String, default: ''},
    secure_url: { type: String, default: '' },
    original_filename: { type: String, default: '',}, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('SongAdded', SONGADDED);