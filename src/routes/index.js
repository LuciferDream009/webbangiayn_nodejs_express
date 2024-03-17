const customerRouter = require('./CustomerRouter')

const routes = (app) => {
    app.use('/api/customer', customerRouter)
}

module.exports = routes