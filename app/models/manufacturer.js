const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: [true, 'Name already exists'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
        unique: [true, 'Location already exists']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('manufacturer', manufacturerSchema);