const Admin = require('../models/mAdmin')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')


class AdminController{
    static create(req,res,next){
        const {email, password } = req.body
        Admin.findOne({email})
        .then(data => {
            if(data){
                let err = {};
                err.statusCode = 409;
                err.message = 'Email already used!'
                next(err)
                return
            } else {
                Admin.create({email, password })
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(next)
            }
        })
    }

    static login(req,res,next){
        const {email , password} = req.body
        
        Admin.findOne({email})
        .then(data => {
            if (data) {
                if (verifyPassword(password, data.password)) {
                    let token = createToken(data)
                    res.status(200).json({token})
                } else {
                   let err = {};
                   err.statusCode = 404;
                   err.message = "email / password not found!"
                   next(err)
                }
            } else {
                   let err = {};
                   err.statusCode = 404;
                   err.message = "email / password not found!"
                   next(err)
            }
        })
        .catch(next)
    }
}

module.exports = AdminController