const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const Admin = require('../models/mAdmin')
chai.use(chaiHttp)
const expect = chai.expect



describe('admin Test', function(){
    let admin = {
        password : "inirahasia",
        email : "fauzi@mail.com"
    }

    after(function(){
        return Admin.deleteMany({})
    })

    describe('Test Route /admin/register', function(){
        it ('Success Register With status 201',function(done){
            chai.request(app)
                .post('/admin/register')
                .send(admin)
                .end(function(err,res){
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body.email).to.equal(admin.email)
                    expect(res.body.password).to.not.equal(admin.password)
                    done()
                })
        })

        it('Failed Register With Status 400 When missing 1 attribute',function(done){
            chai.request(app)
                .post('/admin/register')
                .send({"password" : admin.password })
                .end( (err,res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('statusCode')
                    done()
                })
        })

    })

    describe('Test Route /admin/login',function(){
        it('Failed Login when email not found / password not match',function(done){
            chai.request(app)
                .post('/admin/login')
                .send({ "email": admin.email, "password" : "server"})
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
                .post('/admin/login')
                .send({"email" : admin.email, "password": admin.password})
                .end( (err,res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
        }) 
    // })

    // describe('Test Route /admin/logitOauth',function(){
    //     it('Fail Authorize Token Google',function(done){
    //         chai.request(app)
    //             .post('/admin/loginOauth')
    //             .send('')
    //     })
    })
})