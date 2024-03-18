const User = require('../models/User')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'the email is already'
                })
            }

            const hash = bcrypt.hashSync(password, 10);
            console.log('hash', hash)
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCSESS',
                    data: createUser
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'the email is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'Ok',
                    message: 'the password or user incorrect'
                })
            }
            const accessToken = await genneralAccessToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })

            const refreshToken = await genneralRefreshToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })
            console.log('accessToken', accessToken)
            resolve({
                status: 'OK',
                message: 'SUCCSESS',
                accessToken, refreshToken
            })

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createUser,
    loginUser
}