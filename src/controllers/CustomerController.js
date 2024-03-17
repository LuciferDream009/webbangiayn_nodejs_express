const CustomerService = require('..services/CustomerService')

const createCustomer = (req, res) => {
    try {
        console.log(req.body)
       // await CustomerService.createCustomer();
    } catch (e) {
        return res.status(404).json({
            message : e
        })
    }
}

module.exports = {
    createCustomer
}