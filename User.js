const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/users');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const port = 3000;

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
// app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Get all items
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a single item by id
app.get('/api/users/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Create a new item
app.post('/api/users', async (req, res) => {
  const salt = await bcrypt.genSalt(10); // 10 rounds for hashing
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const item = new Users({
    id: uuidv4(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
  });
  await item.save();
  res.status(201).json(item);
});

// Update an item by id
app.put('/api/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name;
  await item.save();
  res.json(item);
});

// Delete an item by id
app.delete('/api/items/:id', async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);
  if (!item) return res.status(404).send('Item not found');

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
