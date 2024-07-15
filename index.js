const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Get all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Get a single item by id
app.get('/api/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Create a new item
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name
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
