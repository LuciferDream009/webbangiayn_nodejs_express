const UserRouter = require('./UserRouter')

const routes = (app) => {
    app.use('/api/User', UserRouter)
}

module.exports = routes