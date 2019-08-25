const Admin = require('../models/mAdmin')

module.exports = (req,res,next)=> {
    const { id } = req.decode
    Admin.findById(id)
        .then(data => {
            if (data){
                next()
            } else {
                res.status(401).json({message: "your action fail!"})
            }
        })
        .catch(next)
}