const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./config/db');

//connect to db
db.connect();

const app = express();
const port = process.env.PORT|| 3001;

app.use(cors())
app.use(bodyParser.json())

routes(app);

app.listen(port, () => {
    console.log('Server is running in port ' + port);
});