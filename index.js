// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => { 
        res.status(500).json({ message: 'User info could not be retrieved'})  
    })
})

const port = 8000;
server.listen(port, () => console.log("Server Running"))