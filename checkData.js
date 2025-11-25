import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  const userCount = await prisma.user.count();
  const socialAccountCount = await prisma.socialAccount.count();
  const postCount = await prisma.post.count();
  
  console.log('📊 Dados no banco:');
  console.log(`   Usuários: ${userCount}`);
  console.log(`   Contas Sociais: ${socialAccountCount}`);
  console.log(`   Posts: ${postCount}`);
  
  if (userCount > 0) {
    console.log('\n👥 Usuários:');
    const users = await prisma.user.findMany({ select: { name: true, email: true } });
    users.forEach(u => console.log(`   - ${u.name} (${u.email})`));
  }
}

checkData()
  .finally(() => prisma.$disconnect());
