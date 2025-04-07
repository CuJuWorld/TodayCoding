const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model


// Get all users
router.get('/', async (req, res) => {
    try {
        let { UserName } = req.query;
        let users;

        // Filter by UserName
        if(UserName) {
            users = await User.find( { UserName: UserName } );
        } else {
            users = await User.find();
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const { name } = req.query;
        var user;

        try {
            //user = await User.findById(id);
            user = await User.findOne( { _id: id });
            if(!user) res.status(404).json({ message: 'User not found' });
        } catch (err) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ message: err.message });
    }
});

const validateEmail = (UserEmail) => {
    return String(UserEmail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
  


// Create a new user
router.post('/', async (req, res) => {
    const { UserName, UserEmail, address} = req.body;
    if(!UserName) res.status(400).json({ message: "Missing UserName field" });
    if(!UserEmail) res.status(400).json({ message: "Missing UserEmail field" });
    if(!address) res.status(400).json({ message: "Missing address field" });

    const duplicatedEmail = await User.findOne( { UserEmail: UserEmail }) ? true: false;
    if(duplicatedEmail) res.status(400).json({ message: "duplicated UserEmail field. Please enter another UserEmail address" });

    if(!validateEmail(UserEmail)) res.status(400).json({ message: "invalid UserEmail field" });
    const user = new User({
        UserName,
        UserEmail,
        address
    });

    try {
        const newUser = await user.save(); // create users collection
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        let user;
        const { UserName, UserEmail } = req.body;
        try {
            user = await User.findById(req.params.id);
            if(!user) res.status(404).json({ message: 'User not found' });
        } catch (err) {
            res.status(404).json({ message: 'User not found' });
        }

        if (UserName) user.UserName = UserName;
        if (UserEmail) user.UserEmail = UserEmail;
        user = await user.save(); // update users collection
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user;
        try {
            user = await User.findOneAndDelete({ _id: id});
            // user = await User.findByIdAndDelete(id);
            if(!user) return res.status(404).json({ message: `User ${id} has deleted before.` });
        } catch (error) {
            return res.status(404).json({ message: `User ${id} has deleted before.` });
        }
        res.json({ message: `User ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
