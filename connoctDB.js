const mongoose = require('mongoose');

const connoctDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kavyadadhich5:9y0VqtOL0ZMr8L73@notes.sk4yp.mongodb.net/notes?retryWrites=true&w=majority&appName=Notes');
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log('connection is failed', error.message);
    }
}
module.exports = connoctDB;