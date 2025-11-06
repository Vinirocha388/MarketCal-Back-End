import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Iniciando seed com influenciadores famosos...');

  await prisma.post.deleteMany();
  await prisma.socialAccount.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = bcrypt.hashSync('123456', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin MarketCal',
      email: 'admin@marketcal.com',
      password: passwordHash,
    },
  });
  console.log('✓ Admin criado');

  const influencers = [
    { name: 'Whindersson Nunes', platform: 'Instagram', handle: '@whinderssonnunes', userId: admin.id },
    { name: 'Anitta', platform: 'Instagram', handle: '@anitta', userId: admin.id },
    { name: 'Felipe Neto', platform: 'Instagram', handle: '@felipeneto', userId: admin.id },
    { name: 'Carlinhos Maia', platform: 'Instagram', handle: '@carlinhosmaiaof', userId: admin.id },
    { name: 'Viih Tube', platform: 'Instagram', handle: '@viihtube', userId: admin.id },
    { name: 'Casimiro', platform: 'Instagram', handle: '@casimiro', userId: admin.id },
    { name: 'Virginia Fonseca', platform: 'Instagram', handle: '@virginia', userId: admin.id },
    { name: 'Bianca Andrade', platform: 'Instagram', handle: '@biancaandrade', userId: admin.id },
    { name: 'Maisa Silva', platform: 'Instagram', handle: '@maisa', userId: admin.id },
    { name: 'Larissa Manoela', platform: 'Instagram', handle: '@larissamanoela', userId: admin.id },
    { name: 'Neymar Jr', platform: 'Instagram', handle: '@neymarjr', userId: admin.id },
    { name: 'Juliette', platform: 'Instagram', handle: '@juliette', userId: admin.id },
    { name: 'Gkay', platform: 'Instagram', handle: '@gessicakayane', userId: admin.id },
    { name: 'Cristiano Ronaldo', platform: 'Instagram', handle: '@cristiano', userId: admin.id },
    { name: 'Kylie Jenner', platform: 'Instagram', handle: '@kyliejenner', userId: admin.id },
    { name: 'Selena Gomez', platform: 'Instagram', handle: '@selenagomez', userId: admin.id },
    { name: 'The Rock', platform: 'Instagram', handle: '@therock', userId: admin.id },
    { name: 'Ariana Grande', platform: 'Instagram', handle: '@arianagrande', userId: admin.id },
    { name: 'Kim Kardashian', platform: 'Instagram', handle: '@kimkardashian', userId: admin.id },
    { name: 'Lionel Messi', platform: 'Instagram', handle: '@leomessi', userId: admin.id },
  ];

  for (const inf of influencers) {
    await prisma.socialAccount.create({ data: inf });
  }
  console.log(`✓ ${influencers.length} influenciadores criados`);

  const posts = [
    'Bom dia! Começando o dia com energia positiva!',
    'Novo vídeo no canal! Corre lá pra assistir!',
    'Obrigado por todo carinho e apoio de vocês!',
    'Dia de treino pesado! Foco nos objetivos!',
    'Lançamento incrível chegando! Aguardem...',
  ];

  for (let i = 0; i < 100; i++) {
    await prisma.post.create({
      data: {
        userId: admin.id,
        content: posts[i % posts.length],
        imageUrl: `https://picsum.photos/seed/${i}/1080/1080`,
        scheduledAt: '2025-11-' + String(10 + Math.floor(i / 5)).padStart(2, '0'),
        status: Math.random() > 0.3 ? 'SCHEDULED' : 'PUBLISHED',
      },
    });
  }
  console.log('✓ 100 posts criados');
  console.log('\n🎉 Seed concluído! Login: admin@marketcal.com | Senha: 123456');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
