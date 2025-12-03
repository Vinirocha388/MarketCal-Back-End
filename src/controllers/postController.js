import postModel from '../models/postModel.js';

class PostController {
  // Listar todos os posts
  async getAll(req, res) {
    try {
      console.log('📋 Requisição: Listar posts');
      const posts = await postModel.findAll();
      res.json(posts);
    } catch (error) {
      console.error('❌ Erro no controller getAll:', error.message);
      res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  // Buscar um post por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Buscar post ID ${id}`);
      const post = await postModel.findById(id);
      
      if (!post) {
        console.log('⚠ Post não encontrado');
        return res.status(404).json({ error: 'Post não encontrado' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('❌ Erro no controller getById:', error.message);
      res.status(500).json({ error: 'Erro ao buscar post' });
    }
  }

  // Criar um novo post
  async create(req, res) {
    try {
      console.log('📋 Requisição: Criar post');
      console.log('📦 Body recebido:', req.body);
      console.log('📦 Headers:', req.headers['content-type']);
      
      const { content, imageUrl, scheduledAt, userId } = req.body;
      
      const post = await postModel.create({
        content,
        imageUrl,
        scheduledAt,
        userId: Number(userId),
      });
      
      console.log('✓ Post criado no controller');
      res.status(201).json(post);
    } catch (error) {
      console.error('❌ Erro no controller create:', error.message);
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

  // Atualizar um post
  async update(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Atualizar post ID ${id}`);
      const data = req.body;
      
      const post = await postModel.update(id, data);
      console.log('✓ Post atualizado no controller');
      res.json(post);
    } catch (error) {
      console.error('❌ Erro no controller update:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  // Deletar um post
  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Deletar post ID ${id}`);
      await postModel.delete(id);
      
      console.log('✓ Post deletado no controller');
      res.json({ message: 'Post removido com sucesso' });
    } catch (error) {
      console.error('❌ Erro no controller delete:', error.message);
      res.status(500).json({ error: 'Erro ao remover post' });
    }
  }
}

export default new PostController();
