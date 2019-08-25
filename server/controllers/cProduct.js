const Product = require('../models/mProduct')
const {deleteBucket} = require('../middlewares/images')

class ProductController {
   static find (req,res,next) {
        let id = undefined;
        req.params.id && (id = req.params.id)
        Product.findById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                let err = {
                    message: "ID Not Found",
                    statusCode : 404
                }
                next(err)
            }
           
        })
        .catch(next)
   }

   static all(req,res,next){
       Product.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
   }

   static addProduct(req,res,next){
       const data = req.body
        if (req.file && req.file.cloudStoragePublicUrl) {
                data.imageUrl = req.file.cloudStoragePublicUrl;
            }
        const {name, price, imageUrl, description, stock} = req.body
        Product.create({name, price, imageUrl, description, stock})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
   }
   
   static deleteProduct(req,res,next){
       const {id} = req.params
       Product.findByIdAndDelete(id)
        .then(data => {
            // console.log(data)
            return deleteBucket(data.imageUrl)
        })
        .then(data => {
            res.status(200).json({message: "Succesfully deleted!"})
        })
        .catch(next)
   }

   static updateProduct(req,res,next){
       const { id } = req.params
       const update = {};
       if (req.file && req.file.cloudStoragePublicUrl) {
        req.body.imageUrl = req.file.cloudStoragePublicUrl;
       }

       req.body.name && (update.name = req.body.name)
       req.body.price && (update.price = req.body.price)
       req.body.imageUrl && (update.imageUrl = req.body.imageUrl)
       req.body.description && (update.description = req.body.description)
       req.body.stock && (update.stock = req.body.stock)
       Product.findByIdAndUpdate(id, update, {new: true})
       .then(data => {
           res.status(200).json(data)
       })
       .catch(next)

   }
}

module.exports = ProductController