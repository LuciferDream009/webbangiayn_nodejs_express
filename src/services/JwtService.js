const jwt = require('jsonwebtoken')
require('dotenv').config();

const genneralAccessToken = async (payload) => {
    console.log('payload', payload)
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN,{expiresIn: '24h'})

    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN,{expiresIn: '365d'})

    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            console.log('token', token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err){
                    resolve({
                        status: 'ERROR',
                        message: 'the authemtication'
                    })
                }
                
                const { payload } = user
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin : payload?.isAdmin
                })
                console.log('access_token', access_token);
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                });
            })

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}

