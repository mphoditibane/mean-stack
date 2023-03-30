const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://mphditibane40:D2HMF0H6mVksChaZ@cluster0.bnkuxhz.mongodb.net/?retryWrites=true&w=majority")
   .then(() => {
        console.log('Connected to database!');
   })
   .catch(() => {
        console.log('Connection failed!');
   });

app.use(bodyParser.json());
//This will parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-Type");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DETELE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: "Post added successfully"
    });
});

app.get('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: 'fadf124211', 
            title: 'First server-side post', 
            content: 'This is coming from the server!'
        },
        {
            id: 'wdfkje211', 
            title: 'Second server-side post', 
            content: 'This is coming from the server!'
        },
        {
            id: 'dlklde411', 
            title: 'Third server-side post', 
            content: 'This is coming from the server!'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

module.exports = app;