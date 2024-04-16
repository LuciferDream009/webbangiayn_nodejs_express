const User = require('../models/User')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {  name, email, password, confirmPassword, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
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
                    status: 'ERR',
                    message: 'the user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'the password or user incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })
           // console.log('accessToken', accessToken)
            resolve({
                status: 'OK',
                message: 'SUCCSESS',
                access_token, refresh_token
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
            const updateUser = await User.findByIdAndUpdate(id, data,  { new: true })
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

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id 
            })

            if (user === null) {
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

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser, 
    updateUser,
    deleteUSer, 
    getAllUser,
    getDetailsUser,
    deleteManyUser
   
}