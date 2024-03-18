const jwt = require('jsonwebtoken')


const genneralAccessToken = (payload) => {
    console.log('payload', payload)
    const accessToken = jwt.sign({
        payload
    }, 'accessToken',{expiresIn: '2h'})

    return accessToken
}

const genneralRefreshToken = (payload) => {
    console.log('payload', payload)
    const accessToken = jwt.sign({
        payload
    }, 'refreshToken',{expiresIn: '365d'})

    return accessToken
}


module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}