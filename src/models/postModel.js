import prisma from '../../prisma/client.js';

class PostModel {
  // Buscar todos os posts
  async findAll() {
    try {
      console.log('Buscando todos os posts...');
      const posts = await prisma.post.findMany();
      console.log(`✓ Encontrados ${posts.length} posts`);
      return posts;
    } catch (error) {
      console.error('❌ Erro ao buscar posts:', error.message);
      throw error;
    }
  }

  // Buscar um post pelo ID
  async findById(id) {
    try {
      console.log(`Buscando post ID: ${id}`);
      const post = await prisma.post.findUnique({ 
        where: { id: Number(id) } 
      });
      if (post) {
        console.log(`✓ Post encontrado`);
      } else {
        console.log('⚠ Post não encontrado');
      }
      return post;
    } catch (error) {
      console.error('❌ Erro ao buscar post por ID:', error.message);
      throw error;
    }
  }

  // Criar um novo post
  async create(data) {
    try {
      console.log('Criando novo post...');
      const post = await prisma.post.create({ data });
      console.log(`✓ Post criado com sucesso! ID: ${post.id}`);
      return post;
    } catch (error) {
      console.error('❌ Erro ao criar post:', error.message);
      throw error;
    }
  }

  // Atualizar um post
  async update(id, data) {
    try {
      console.log(`Atualizando post ID: ${id}`);
      const post = await prisma.post.update({ 
        where: { id: Number(id) }, 
        data 
      });
      console.log(`✓ Post atualizado com sucesso!`);
      return post;
    } catch (error) {
      console.error('❌ Erro ao atualizar post:', error.message);
      throw error;
    }
  }

  // Deletar um post
  async delete(id) {
    try {
      console.log(`Deletando post ID: ${id}`);
      const post = await prisma.post.delete({ 
        where: { id: Number(id) } 
      });
      console.log(`✓ Post deletado com sucesso!`);
      return post;
    } catch (error) {
      console.error('❌ Erro ao deletar post:', error.message);
      throw error;
    }
  }
}

export default new PostModel();
