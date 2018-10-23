const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/Perros.js')

mongoose.connect('mongodb://mgmike:password1@ds135993.mlab.com:35993/miguel')

const app = express();


app.use(bodyParser.json());


const perrosRoutes = require('./routes/perrosRoutes.js');
perrosRoutes(app);

app.listen(5000);
