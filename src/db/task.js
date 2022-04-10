const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    task: {
        type: String,
        trim: true,
        required: true
    },
    due: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task