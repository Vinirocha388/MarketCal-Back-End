import prisma from '../../prisma/client.js';

class PostModel {
  async findAll() {
    return prisma.post.findMany({ include: { accounts: true } });
  }

  async findById(id) {
    return prisma.post.findUnique({ where: { id: Number(id) }, include: { accounts: true } });
  }

  async create(data) {
    return prisma.post.create({ data });
  }

  async update(id, data) {
    return prisma.post.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.post.delete({ where: { id: Number(id) } });
  }
}

export default new PostModel();
