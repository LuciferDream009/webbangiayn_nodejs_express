const path = require('path');
const express = require('express');

const db = require('./config/db/index');

//connect db

db.connect();

const app = express();
const port = 3000;