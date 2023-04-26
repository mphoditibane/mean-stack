const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular')
   .then(() => {
        console.log('Connected to database!');
   })
   .catch(() => {
        console.log('Connection failed!');
   });

app.use(bodyParser.json());
//This will parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));

var cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-Type");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DETELE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;