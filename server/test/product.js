const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const product = require('../models/mProduct')
const expect = chai.expect


describe('Products Test', function () {
    describe('TEST GET PRODUCTS',function() {

        let data = {
            name : 'Black King Bar',
            price : 3650,
            imageUrl : "https://www.google.com",
            description : 'KULLLLLL',
        }

        let id = '';

        before(function(){
            product.create(data)
                .then(data => {
                    id = data.id;
                })
                .catch(err=> {
                    console.log(err)
                })
        })

        after(function(){
            return product.deleteMany({})
        })


        it('Success get all products with status code 200', function (done){
            chai.request(app)
                 .get('/product/all')
                 .end((err,res) => {
                     expect(res).to.have.status(200)
                     expect(res).to.be.an('object')
                     done()
                 })
        })
        
        it('success get one product with status code 200',function(done){
            chai.request(app)
                .get(`/product/find/${id}`)
                .end((err,res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('imageUrl')
                    expect(res.body).to.have.property('description')
                    done()
                })
        })

        it('Failed get Product when not found with status code 404', function(done){
            chai.request(app)
                .get('/product/find/5d61c282909f2419afbb9596')
                .end((err,res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })  
        })
    })
})