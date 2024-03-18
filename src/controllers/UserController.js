const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailPattern.test(email); 
        if(!name || !email || !password|| !confirmPassword|| !phone){
            return res.status(200).json({
                status: 'ERR',
                message:'The input in required'
            })
        } else if (!isValid) {
            return res.status(200).json({
                status: 'ERR',
                message:'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message:'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailPattern.test(email); 
        if(!name || !email || !password|| !confirmPassword|| !phone){
            return res.status(200).json({
                status: 'ERR',
                message:'The input in required'
            })
        } else if (!isValid) {
            return res.status(200).json({
                status: 'ERR',
                message:'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message:'The password is equal confirmPassword'
            })
        }
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

module.exports = {
    createUser,
    loginUser
}