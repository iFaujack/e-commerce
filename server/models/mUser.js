const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {createPassword} = require('../helpers/bcrypt')

const userSchema = new Schema({
    fullname : {
        type: String,
        required: [true, "fullname null"]
    },
    email : {
        type : String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required: true
    },
})

userSchema.pre('save',function (){
    this.password = createPassword(this.password)
})

const User = mongoose.model('User',userSchema)

module.exports = User