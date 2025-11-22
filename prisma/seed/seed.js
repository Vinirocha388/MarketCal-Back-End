// import bcrypt from 'bcryptjs';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌟 Iniciando seed baseado no schema...');

//   // Limpar dados existentes
//   await prisma.post.deleteMany();
//   await prisma.socialAccount.deleteMany();
//   await prisma.user.deleteMany();

//   const passwordHash = bcrypt.hashSync('123456', 10);

//   // Criar usuários (Influenciadores Brasileiros)
//   const users = [
//     { name: 'Whindersson Nunes', email: 'whindersson@marketcal.com', password: passwordHash },
//     { name: 'Virginia Fonseca', email: 'virginia@marketcal.com', password: passwordHash },
//     { name: 'Carlinhos Maia', email: 'carlinhos@marketcal.com', password: passwordHash },
//     { name: 'Juliette Freire', email: 'juliette@marketcal.com', password: passwordHash },
//     { name: 'Felipe Neto', email: 'felipeneto@marketcal.com', password: passwordHash },
//     { name: 'Bianca Andrade (Boca Rosa)', email: 'bianca@marketcal.com', password: passwordHash },
//     { name: 'Viih Tube', email: 'viihtube@marketcal.com', password: passwordHash },
//     { name: 'Casimiro Miguel', email: 'casimiro@marketcal.com', password: passwordHash },
//     { name: 'Maisa Silva', email: 'maisa@marketcal.com', password: passwordHash },
//     { name: 'Gkay (Gessica Kayane)', email: 'gkay@marketcal.com', password: passwordHash },
//   ];

//   const createdUsers = [];
//   for (const userData of users) {
//     const user = await prisma.user.create({ data: userData });
//     createdUsers.push(user);
//   }
//   console.log(`✓ ${createdUsers.length} usuários criados`);

//   // Plataformas disponíveis (apenas Instagram, LinkedIn e Facebook)
//   const platforms = ['Instagram', 'LinkedIn', 'Facebook'];

//   // Criar contas sociais para cada usuário
//   const socialAccounts = [];
//   for (const user of createdUsers) {
//     // Criar uma conta para cada plataforma (garantindo handles únicos)
//     for (const platform of platforms) {
//       const baseHandle = user.name.toLowerCase().replace(/\s+/g, '').replace(/[()]/g, '');
//       let handle = `@${baseHandle}`;
      
//       // Para LinkedIn e Facebook, adicionar sufixo para diferenciar
//       if (platform === 'LinkedIn') {
//         handle = `@${baseHandle}.oficial`;
//       } else if (platform === 'Facebook') {
//         handle = `@${baseHandle}oficial`;
//       }
      
//       const account = await prisma.socialAccount.create({
//         data: {
//           name: user.name, // Apenas o nome do influenciador
//           platform: platform,
//           handle: handle,
//           userId: user.id,
//         },
//       });
//       socialAccounts.push(account);
//     }
//   }
//   console.log(`✓ ${socialAccounts.length} contas sociais criadas`);

//   // Conteúdos variados para posts
//   const postContents = [
//     'Bom dia! Começando o dia com energia positiva! ☀️',
//     'Novo conteúdo disponível! Vem conferir! 🎥',
//     'Obrigado por todo carinho e apoio de vocês! ❤️',
//     'Dia de foco total nos objetivos! 💪',
//     'Lançamento incrível chegando em breve... 🚀',
//     'Compartilhando minha rotina com vocês! 📸',
//     'Dica do dia: nunca desista dos seus sonhos! ✨',
//     'Sessão de perguntas e respostas hoje! Me mandem dúvidas! 💬',
//     'Momento de agradecer tudo que conquistei! 🙏',
//     'Próximo projeto vem aí! Fiquem ligados! 👀',
//     'Treino concluído! Saúde em primeiro lugar! 🏋️',
//     'Colaboração especial no ar! Confiram! 🎊',
//     'Por trás das câmeras do meu trabalho! 🎬',
//     'Final de semana chegando! Quais os planos? 🎉',
//     'Reflexão do dia sobre crescimento pessoal 🌱',
//     'Novidade imperdível chegando! Preparem-se! 🔥',
//     'Gratidão define meu dia hoje! 💫',
//     'Live hoje às 20h! Não percam! 📺',
//     'Bastidores do último projeto! 🎭',
//     'Inspiração do dia: acredite em você! 💪',
//     'Parceria incrível anunciada em breve! 🤝',
//     'Momento família é tudo! ❤️',
//     'Trabalhando em algo especial para vocês! ⚡',
//     'Dica de produtividade que mudou minha vida! 📝',
//     'Reflexões sobre a jornada até aqui... 🌟',
//     'Agradecendo cada mensagem de carinho! 💌',
//     'Novo desafio aceito! Vamos juntos? 🎯',
//     'Momento nostalgia: olha onde chegamos! 📷',
//     'Preparando surpresa para os seguidores! 🎁',
//     'Dia de gravar novos conteúdos! 🎬',
//     'Compartilhando aprendizados da semana! 📚',
//     'Pausa para agradecer vocês! 🙌',
//     'Anúncio importante em breve! Aguardem! 📢',
//     'Momento autocuidado é essencial! 🧘',
//     'Celebrando pequenas vitórias! 🏆',
//     'Inspiração matinal para vocês! ☕',
//     'Trabalho duro nos bastidores! 💼',
//     'Gratidão por cada conquista! ✨',
//     'Próximo vídeo vai surpreender! 🎥',
//     'Dividindo minha rotina fitness! 🏃',
//     'Momento de conexão com vocês! 💝',
//     'Preparativos para grande evento! 🎪',
//     'Dica valiosa que aprendi hoje! 💡',
//     'Nostalgia batendo forte aqui! 🥺',
//     'Parceria dos sonhos confirmada! 🌈',
//     'Agradecendo o apoio de sempre! 🤗',
//     'Novo projeto em desenvolvimento! 🚀',
//     'Momento reflexão e planejamento! 📋',
//     'Compartilhando alegria com vocês! 😊',
//     'Preparando conteúdo especial! 🎨',
//   ];

//   const statuses = ['SCHEDULED', 'PUBLISHED', 'DRAFT', 'CANCELLED'];

//   // Criar 100 posts vinculados aos usuários e contas sociais
//   const posts = [];
//   for (let i = 0; i < 100; i++) {
//     const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
//     const userSocialAccounts = socialAccounts.filter(acc => acc.userId === user.id);
    
//     if (userSocialAccounts.length === 0) continue;

//     // Selecionar 1-3 contas sociais aleatórias do usuário
//     const numAccountsForPost = Math.min(
//       Math.floor(Math.random() * 3) + 1,
//       userSocialAccounts.length
//     );
//     const selectedAccounts = [];
//     const shuffled = [...userSocialAccounts].sort(() => 0.5 - Math.random());
//     for (let j = 0; j < numAccountsForPost; j++) {
//       selectedAccounts.push(shuffled[j]);
//     }

//     const day = 6 + Math.floor(i / 2);
//     const month = day > 30 ? 12 : 11;
//     const actualDay = day > 30 ? day - 30 : day;
    
//     const post = await prisma.post.create({
//       data: {
//         userId: user.id,
//         content: postContents[Math.floor(Math.random() * postContents.length)],
//         imageUrl: Math.random() > 0.3 ? `https://picsum.photos/seed/${i}/1080/1080` : null,
//         scheduledAt: `2025-${String(month).padStart(2, '0')}-${String(actualDay).padStart(2, '0')}`,
//         status: statuses[Math.floor(Math.random() * statuses.length)],
//         socialAccounts: {
//           connect: selectedAccounts.map(acc => ({ id: acc.id })),
//         },
//       },
//     });
//     posts.push(post);
//   }
//   console.log(`✓ ${posts.length} posts criados`);

//   console.log('\n🎉 Seed concluído com sucesso!');
//   console.log('📋 Dados criados:');
//   console.log(`   • ${createdUsers.length} influenciadores brasileiros`);
//   console.log(`   • ${socialAccounts.length} contas sociais`);
//   console.log(`   • ${posts.length} posts agendados`);
//   console.log('\n🔑 Credenciais de teste (Senha: 123456):');
//   createdUsers.forEach(user => {
//     console.log(`   - ${user.name}: ${user.email}`);
//   });
// }

// main()
//   .catch((e) => {
//     console.error('❌ Erro:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
