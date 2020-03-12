const express = require('express');
// const helmet = require('helmet');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

// why didn't others use helmet?
// server.use(helmet());
server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;