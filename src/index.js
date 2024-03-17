const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes')


const db = require('./config/db');

//connect to db
db.connect();



const app = express();
const port = process.env.PORT|| 3001;


app.get('/', (req, res) => {
    return res.send('Hello DIT CON ME MAY');
})

routes(app);

app.listen(port, () => {
    console.log('Server is running in port ' + port);
});