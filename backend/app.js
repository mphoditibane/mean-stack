const express = require('express');
const bodyParser = require("body-parser");

const app = express();

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
    const post = req.body;
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