const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const users = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, min: 0 },
    password:{type:String , required:true},
    createdAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users', users);

module.exports = Users;