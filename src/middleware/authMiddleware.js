const jwt = require('jsonwebtoken')
require('dotenv').config();


const authMiddleware = (req, res, next) => {
    console.log('checkToken', req.headers.token);
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token,  process.env.ACCESS_TOKEN, function(err, user){
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authemtication'
            })
        }
        const { payload } = user
        if(payload.isAdmin) {
            next()
        }else{
            return res.status(404).json({
                status: 'ERR',
                message: 'the authemtication'
            })
        }
    })
}

module.exports = {
    authMiddleware
}