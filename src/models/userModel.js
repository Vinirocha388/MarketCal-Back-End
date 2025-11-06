import prisma from '../../prisma/client.js';

class UserModel {
  async findAll() {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    return users;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    return user;
  }

  // obter um usuario pelo email
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data) {
    const user = await prisma.user.create({
      data,
    });

    // não retornar senha diretamente do model
    const { password, ...rest } = user;
    return rest;
  }

  async update(id, data) {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    const { password, ...rest } = user;
    return rest;
  }

  async delete(id) {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    const { password, ...rest } = user;
    return rest;
  }
}

export default new UserModel();