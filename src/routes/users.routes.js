import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

// List users
router.get('/', async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await userModel.update(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await userModel.delete(req.params.id);
    res.json({ message: 'Usuário removido', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
});

export default router;
