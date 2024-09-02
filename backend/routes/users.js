// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  const { name, email, username, password, city, street, neighborhood, number, cep } = req.body;

  try {
    const user = new User({
      name,
      email,
      username,
      password,
      city,
      street,
      neighborhood,
      number,
      cep,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Rota para login do usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
