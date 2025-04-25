
const express = require('express');
const router = express.Router();
//const User = require('../models/user');

//POST 
// router.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// //GET
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
router.get('/register', async (req, res) => {
  try {
      res.status(201).json({ message: "test"});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


// //GET single
// router.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// //UPDATE
// router.patch('/users/:id', async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['name', 'email', 'age'];
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }

//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (user[update] = req.body[update]));
//     await user.save();
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// //DELETE
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

