const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-db-mongoose', {
    useNewUrlParser: true 
})

console.log('db is running now')

