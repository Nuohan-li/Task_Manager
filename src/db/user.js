const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User