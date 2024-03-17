const User = require('../models/User')

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone }  = newUser
        try {
            const createUser =  await User.create({
                name, 
                email, 
                password, 
                confirmPassword, 
                phone
            })
            if(createUser) {
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


module.exports = {
    createUser
}