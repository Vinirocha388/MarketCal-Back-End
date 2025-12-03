import socialModel from '../models/socialAccountModel.js';

class SocialAccountController {
  // Listar todas as contas
  async getAll(req, res) {
    try {
      console.log('📋 Requisição: Listar contas sociais');
      const accounts = await socialModel.findAll();
      res.json(accounts);
    } catch (error) {
      console.error('❌ Erro no controller getAll:', error.message);
      res.status(500).json({ error: 'Erro ao listar contas' });
    }
  }

  // Buscar uma conta por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Buscar conta ID ${id}`);
      const account = await socialModel.findById(id);
      
      if (!account) {
        console.log('⚠ Conta não encontrada');
        return res.status(404).json({ error: 'Conta não encontrada' });
      }
      
      res.json(account);
    } catch (error) {
      console.error('❌ Erro no controller getById:', error.message);
      res.status(500).json({ error: 'Erro ao buscar conta' });
    }
  }

  // Criar uma nova conta
  async create(req, res) {
    try {
      console.log('📋 Requisição: Criar conta social');

      
      const { name, platform, handle, userId, imageUrl } = req.body;
      
      // Validação básica
      if (!name || !platform || !handle || !userId) {
        console.log('⚠ Campos obrigatórios faltando');
        return res.status(400).json({ 
          error: 'Todos os campos são obrigatórios',
          campos: { name, platform, handle, userId }
        });
      }
      
      const account = await socialModel.create({
        name,
        platform,
        handle,
        userId: Number(userId),
        imageUrl: imageUrl || null,
      });
      
      console.log('✓ Conta criada no controller');
      res.status(201).json(account);
    } catch (error) {
      console.error('❌ Erro no controller create:', error.message);
      console.error('Erro completo:', error);
      res.status(500).json({ error: 'Erro ao criar conta', detalhe: error.message });
    }
  }

  // Atualizar uma conta
  async update(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Atualizar conta ID ${id}`);
      const data = req.body;
      
      const account = await socialModel.update(id, data);
      console.log('✓ Conta atualizada no controller');
      res.json(account);
    } catch (error) {
      console.error('❌ Erro no controller update:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar conta' });
    }
  }

  // Deletar uma conta
  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 Requisição: Deletar conta ID ${id}`);
      await socialModel.delete(id);
      
      console.log('✓ Conta deletada no controller');
      res.json({ message: 'Conta removida com sucesso' });
    } catch (error) {
      console.error('❌ Erro no controller delete:', error.message);
      res.status(500).json({ error: 'Erro ao remover conta' });
    }
  }
}

export default new SocialAccountController();
