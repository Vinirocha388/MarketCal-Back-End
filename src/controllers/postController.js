import postModel from '../models/postModel.js';

class PostController {
  async list(req, res) {
    try {
      const posts = await postModel.findAll();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const p = await postModel.findById(id);
      if (!p) return res.status(404).json({ error: 'Post não encontrado' });
      res.json(p);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter post' });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;

      // validação: scheduledAt não pode ser no passado
      if (!data.scheduledAt) return res.status(400).json({ error: 'scheduledAt é obrigatório' });
      const scheduled = new Date(data.scheduledAt);
      if (isNaN(scheduled.getTime())) return res.status(400).json({ error: 'scheduledAt inválido' });
      if (scheduled < new Date()) return res.status(400).json({ error: 'scheduledAt não pode ser no passado' });

      // associar ao usuário logado
      if (!data.userId && req.userId) data.userId = req.userId;

      // tratar accounts (espera array de ids)
      let createData = { ...data };
      if (data.accounts && Array.isArray(data.accounts)) {
        createData.accounts = { connect: data.accounts.map((id) => ({ id: Number(id) })) };
      }

      const post = await postModel.create(createData);
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const post = await postModel.update(id, data);
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.delete(id);
      res.json({ message: 'Removido', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao remover post' });
    }
  }
}

export default new PostController();
