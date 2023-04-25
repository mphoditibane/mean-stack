const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require('./models/post');

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

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id
        });
    });
});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(res => {
        console.log(res);
        res.status(200).json({message: "Update successful!"});
    })
});

app.get('/api/posts',(req, res, next) => {
    Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        }); 
    });

});

app.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
       if (post) {
        res.status(200).json(post);
       } else {
        res.status(404).json({message: 'Post not found!'});
       } 
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id : req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post deleted!'});
    });
});

module.exports = app;