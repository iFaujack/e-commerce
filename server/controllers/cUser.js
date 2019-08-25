const User = require('../models/mUser')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Cart = require('../controllers/cCart')


class UserController {
    static register(req, res, next) {
        const { fullname, email, password } = req.body
        User.findOne({email})
        .then(data => {
            if(data){
                let err = {};
                err.statusCode = 409;
                err.message = 'Email already used!'
                next(err)
                return
            } else {
                User.create({ fullname, email, password })
                .then(data => {
                    Cart.create(data.id)
                    res.status(201).json(data)
                })
                .catch(next)
            }
        })
        
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
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

    static loginFromOauth(req, res) {
        const { token } = req.body;
        client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.payload
                console.log(payload)
                return User.findOne({
                        email: payload.email
                    })
                    .then(data => {
                        if (data) {
                            return data
                        } else {
                            return User.create({
                                email: payload.email,
                                fullname : payload.given_name + " " + payload.family_name,
                                password: "uzumymw"
                            })
                        }
                    })
                    .then(data => {
                        let token = createToken(data)
                        const { firstname, id } = data
                        res.status(200).json({ token })
                    })
            })
            .catch(err => {
                res.status(500)({ message: 'Internal Server Error' })
            })
    }

}


module.exports = UserController