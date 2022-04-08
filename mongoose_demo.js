const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-db-mongoose', {
    useNewUrlParser: true 
})

// defining a model -> all document created using this mode must follow the rules defined here
// features / requirements provided by mongoose: https://mongoosejs.com/docs/schematypes.html
const User = mongoose.model('User', {
    name: {
        type: String, // name must be string
        required: true, // indicating that this field must be filled
        trim: true  // removes spaces in front or behind
    },
    age: {
        type: Number, // age must be number
        validate(value){ // custom validation
            if(value < 0){
                throw new Error('age cannot be negative')
            }
        },
        default: 0  // default value if no value is provided
    },
    email: {
        type: String,
        validate(value){    // validating using validator -> https://www.npmjs.com/package/validator
            if(!validator.isEmail(value)){
                throw new Error('email format is invalid')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value){
            if(validator.contains(value.toLowerCase(), 'password')){
                throw new Error('invalid password')
            }
        }
    }
})

// defining a second model
const Task = mongoose.model('Task', {
    task: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


new Task({
    task: 'task1',
    completed: true
}).save().then( (result) => {
    console.log(result)
} ).catch( (error) => {
    console.log(error)
})

// creating document from the model
const user1 = new User({
    name: 'name23       ',
    age: 2,
    email: 'linDSDFDSDahan@hdsa.com',
    password: 'pas12123123PASSWO'
})

user1.save().then( (result) => {
    console.log(result)
}).catch( (error) => {
    console.log(error)
})