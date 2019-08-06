// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: 'Enter name and bio for the user.' });
    } else {
      Users.insert(req.body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({ message:"Couldn't add user",});
        });
    }
  });

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => { 
        res.status(500).json({ message: 'User info could not be retrieved'})  
    })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then( user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res
            .status(404)
            .json({ message: "User doesn't exist"})
        }
    })
    .catch(() => {
        res
            .status(500)
            .json({ message: "User info couldn't be retrieved"})
    });
});

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
        if (count && count > 0) {
            res.status(200).json({ message: 'User deleted'})
        } else {
            res
                .status(404)
                .json({message: "User does not exist"});
        }
    })
    .catch(() => {
        res.status(500).json({ message: "Deletion failed"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res
            .status(400)
            .json({ message: 'Input name and bio'});
    } else {
        Users.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res
                .status(404)
                .json({ message: 'User does not exist'})
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Could not update'})
        })
    }
})

const port = 8000;
server.listen(port, () => console.log("Server Running"))