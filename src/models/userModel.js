import prisma from '../../prisma/client.js';

class UserModel {
  // Buscar todos os usuários
  async findAll() {
    try {
      console.log('Buscando todos os usuários...');
      const users = await prisma.user.findMany();
      console.log(`✓ Encontrados ${users.length} usuários`);
      return users;
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error.message);
      throw error;
    }
  }

  // Buscar um usuário pelo ID
  async findById(id) {
    try {
      console.log(`Buscando usuário ID: ${id}`);
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (user) {
        console.log(`✓ Usuário encontrado: ${user.email}`);
      } else {
        console.log('⚠ Usuário não encontrado');
      }
      return user;
    } catch (error) {
      console.error('❌ Erro ao buscar usuário por ID:', error.message);
      throw error;
    }
  }

  // Buscar um usuário pelo email
  async findByEmail(email) {
    try {
      console.log(`Buscando usuário por email: ${email}`);
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        console.log(`✓ Usuário encontrado: ${user.name}`);
      }
      return user;
    } catch (error) {
      console.error('❌ Erro ao buscar usuário por email:', error.message);
      throw error;
    }
  }

  // Criar um novo usuário
  async create(data) {
    try {
      console.log(`Criando novo usuário: ${data.email}`);
      const user = await prisma.user.create({
        data,
      });
      console.log(`✓ Usuário criado com sucesso! ID: ${user.id}`);
      return user;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error.message);
      throw error;
    }
  }

  // Atualizar um usuário
  async update(id, data) {
    try {
      console.log(`Atualizando usuário ID: ${id}`);
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data,
      });
      console.log(`✓ Usuário atualizado com sucesso!`);
      return user;
    } catch (error) {
      console.error('❌ Erro ao atualizar usuário:', error.message);
      throw error;
    }
  }

  // Deletar um usuário
  async delete(id) {
    try {
      console.log(`Deletando usuário ID: ${id}`);
      const user = await prisma.user.delete({
        where: { id: Number(id) },
      });
      console.log(`✓ Usuário deletado com sucesso!`);
      return user;
    } catch (error) {
      console.error('❌ Erro ao deletar usuário:', error.message);
      throw error;
    }
  }
}

export default new UserModel();