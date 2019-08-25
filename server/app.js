if(!process.env.NODE_ENV || process.env.NODE_ENV == "development"){
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')


const port = process.env.PORT || 3000
const db_url = process.env.DB_URL

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
const route = require('./routes/index')

mongoose.connect(db_url,{useNewUrlParser : true})
.then(function(){
    console.log('db connected')
})
.catch(function () {
    console.log('fail to connect')
})

app.use('/', route)
app.use((err,req,res,next) => {
    let statusCode = err.statusCode || 500
    let message = err.message
    if (err.name === "ValidationError"){
        let key = Object.keys(err.errors)
        statusCode = 400;
        message = err.errors[key[0]].message; 
    }
    res.status(statusCode).json({statusCode, message})
})




app.listen(port,function (){
    console.log('Jalan di port : '+port)
})

module.exports = app

