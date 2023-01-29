const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

const db = require('./db/database');

const registerRoute = require('./routes/register');
const guitarRoute = require('./routes/guitarRoute');
const newsRoute = require('./routes/newsRoute');

app.use(cors());
app.use(express.json());
app.use('/image',express.static(path.join(__dirname,'image')))
app.use(bodyParser.urlencoded({extended:false}));
app.use(registerRoute);
app.use(guitarRoute);
app.use(newsRoute);

app.listen(90);