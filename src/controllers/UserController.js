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

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message:'The userID in required'
            })
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

const deleteUSer = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message:'The userID in required'
            })
        }
        const response = await UserService.deleteUSer(userId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}


const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message:'The userID in required'
            })
        }
        const response = await UserService.getDetailUser(userId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUSer,
    getAllUser,
    getDetailUser
}