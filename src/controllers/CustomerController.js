const CustomerService = require('../services/CustomerService')

const createCustomer = async (req, res) => {
    try {
        console.log(req.body)
        const res = await CustomerService.createCustomer();
        return res.status(200).json(res)
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

module.exports = {
    createCustomer
}