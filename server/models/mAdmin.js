const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {createPassword} = require('../helpers/bcrypt')


const adminSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    }
})

adminSchema.pre('save', function(){
    this.password = createPassword(this.password)
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin