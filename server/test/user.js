const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const User = require('../models/mUser')
const expect = chai.expect


describe('User Test', function(){
    let user = {
        fullname : "Fauzi Nur Fadillah",
        password : "inirahasia",
        email : "fauzi@mail.com"
    }
    after(function(){
        return User.deleteMany({})
    })
    describe('Test Route /user/register', function(){
        it ('Success Register With status 201',function(done){
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end(function(err,res){
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body).to.have.property('fullname')
                    expect(res.body.email).to.equal(user.email)
                    expect(res.body.password).to.not.equal(user.password)
                    expect(res.body.fullname).to.equal(user.fullname)
                    done()
                })
        })

        it('Failed Register With Status 400 When missing 1 attribute',function(done){
            chai.request(app)
                .post('/user/register')
                .send({ "fullname" : user.fullname , "password" : user.password })
                .end( (err,res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    done()
                })
        })

        it('Failed Register When Email already Used', function(done){
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end( (err,res) => {
                    expect(res).to.have.status(409)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.includes('already used')
                    done()
                })
        })

        it('Failed Register When Email Not a valid address', function(done){
            chai.request(app)
                .post('/user/register')
                .send({"email" : "fauzimail.com" , "fullname" : user.fullname, "password" : user.password})
                .end( (err,res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    expect(res.body.message).to.includes('valid email address')
                    done()
                })
        })
    })

    describe('Test Route /user/login',function(){
        it('Failed Login when email not found / password not match',function(done){
            chai.request(app)
                .post('/user/login')
                .send({ "email": user.email, "password" : "server"})
                .end( (err,res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    done()
                })
        })

        it('Success Login with status code 200',function(done){
            chai.request(app)
                .post('/user/login')
                .send({"email" : user.email, "password": user.password})
                .end( (err,res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
        }) 
    // })

    // describe('Test Route /user/logitOauth',function(){
    //     it('Fail Authorize Token Google',function(done){
    //         chai.request(app)
    //             .post('/user/loginOauth')
    //             .send('')
    //     })
    })
})