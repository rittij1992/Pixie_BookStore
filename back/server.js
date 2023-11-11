const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4001;
const Router = require('./routes/IndexRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const connectToDataBase = require('./configure/config_db');
connectToDataBase();
app.use(express.static("public"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.listen(port, ()=>{
    console.log(`App server listening to http://localhost:${port}...`);
});