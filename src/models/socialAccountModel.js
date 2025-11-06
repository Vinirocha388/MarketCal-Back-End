import prisma from '../../prisma/client.js';

class SocialAccountModel {
  async findAll() {
    return prisma.socialAccount.findMany();
  }

  async findById(id) {
    return prisma.socialAccount.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    return prisma.socialAccount.create({ data });
  }

  async update(id, data) {
    return prisma.socialAccount.update({ where: { id: Number(id) }, data });
  }

  async delete(id) {
    return prisma.socialAccount.delete({ where: { id: Number(id) } });
  }
}

export default new SocialAccountModel();
