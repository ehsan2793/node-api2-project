// implement your server here
// require your posts router and connect it here
const express = require('express');
const postRouter = require('./posts/posts-router');


const server = express();
server.use(express.json());


server.use('/api/posts', postRouter)



server.get('/', (req, res) => {
    res.send('<h1>welcome to post  api type /api/posts to see the posts </h1>');
})



module.exports = server