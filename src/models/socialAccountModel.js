import prisma from '../../prisma/client.js';

class SocialAccountModel {
  // Buscar todas as contas
  async findAll() {
    try {
      console.log('Buscando todas as contas sociais...');
      const accounts = await prisma.socialAccount.findMany();
      console.log(`✓ Encontradas ${accounts.length} contas`);
      return accounts;
    } catch (error) {
      console.error('❌ Erro ao buscar contas:', error.message);
      throw error;
    }
  }

  // Buscar uma conta pelo ID
  async findById(id) {
    try {
      console.log(`Buscando conta ID: ${id}`);
      const account = await prisma.socialAccount.findUnique({ 
        where: { id: Number(id) } 
      });
      if (account) {
        console.log(`✓ Conta encontrada: ${account.name}`);
      } else {
        console.log('⚠ Conta não encontrada');
      }
      return account;
    } catch (error) {
      console.error('❌ Erro ao buscar conta por ID:', error.message);
      throw error;
    }
  }

  // Criar uma nova conta
  async create(data) {
    try {
      console.log(`Criando nova conta: ${data.name}`);
      const account = await prisma.socialAccount.create({ data });
      console.log(`✓ Conta criada com sucesso! ID: ${account.id}`);
      return account;
    } catch (error) {
      console.error('❌ Erro ao criar conta:', error.message);
      throw error;
    }
  }

  // Atualizar uma conta
  async update(id, data) {
    try {
      console.log(`Atualizando conta ID: ${id}`);
      const account = await prisma.socialAccount.update({ 
        where: { id: Number(id) }, 
        data 
      });
      console.log(`✓ Conta atualizada com sucesso!`);
      return account;
    } catch (error) {
      console.error('❌ Erro ao atualizar conta:', error.message);
      throw error;
    }
  }

  // Deletar uma conta
  async delete(id) {
    try {
      console.log(`Deletando conta ID: ${id}`);
      const account = await prisma.socialAccount.delete({ 
        where: { id: Number(id) } 
      });
      console.log(`✓ Conta deletada com sucesso!`);
      return account;
    } catch (error) {
      console.error('❌ Erro ao deletar conta:', error.message);
      throw error;
    }
  }
}

export default new SocialAccountModel();
