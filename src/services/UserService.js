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
           // console.log('accessToken', accessToken)
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

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id 
            })
            console.log('checkUser', checkUser)

            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data)
            console.log('updateUser', updateUser);
            resolve({
                status: 'OK',
                message: 'User updated successfully',
                data: updateUser
            });

        } catch (error) {
            reject(error);
        }
    })
}

const deleteUSer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id 
            })

            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            await User.findByIdAndDelete(id)
            console.log('updateUser', updateUser);
            resolve({
                status: 'OK',
                message: 'Delete user successfully'
            });

        } catch (error) {
            reject(error);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser
            });

        } catch (error) {
            reject(error);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id 
            })

            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            });

        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createUser,
    loginUser, 
    updateUser,
    deleteUSer, 
    getAllUser,
    getDetailUser
}