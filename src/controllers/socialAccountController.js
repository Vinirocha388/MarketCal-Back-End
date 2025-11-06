import socialModel from '../models/socialAccountModel.js';

class SocialAccountController {
  async list(req, res) {
    try {
      const accounts = await socialModel.findAll();
      res.json(accounts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar social accounts' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const acc = await socialModel.findById(id);
      if (!acc) return res.status(404).json({ error: 'Conta não encontrada' });
      res.json(acc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter social account' });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      // associar ao usuário logado, se desejado
      if (!data.userId && req.userId) data.userId = req.userId;
      const acc = await socialModel.create(data);
      res.status(201).json(acc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar social account' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const acc = await socialModel.update(id, data);
      res.json(acc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar social account' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const acc = await socialModel.delete(id);
      res.json({ message: 'Removido', acc });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao remover social account' });
    }
  }
}

export default new SocialAccountController();
