const express = require('express');

const app = express();


app.use('/api/posts',(req, res, next) => {
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