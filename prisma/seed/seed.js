import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

async function main() {
	console.log('Iniciando seed...')

	// Limpa dados (mantém idempotência durante desenvolvimento)
	await prisma.post.deleteMany()
	await prisma.socialAccount.deleteMany()
	await prisma.user.deleteMany()

	const passwordHash = bcrypt.hashSync('password123', 10)

	const user = await prisma.user.create({
		data: {
			name: 'Agencia MarketCal',
			email: 'agency@example.com',
			password: passwordHash,
			role: 'agency',
		},
	})

	const platforms = ['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK', 'TIKTOK', 'OTHER']

	// Criar 10 social accounts
	const socialAccounts = []
	for (let i = 0; i < 10; i++) {
		const acc = await prisma.socialAccount.create({
			data: {
				name: `${faker.company.name()} - Cliente ${i + 1}`,
				platform: platforms[i % platforms.length],
				handle: faker.internet.userName(),
				metadata: { createdWith: 'seed', seedIndex: i + 1 },
				user: { connect: { id: user.id } },
			},
		})
		socialAccounts.push(acc)
	}

	// Criar 100 posts
	const postsToCreate = 100
	const now = new Date()
	for (let i = 0; i < postsToCreate; i++) {
		// Agendar entre 0 e 60 dias no futuro (maioria futura)
		const daysOffset = randomInt(0, 60)
		const hoursOffset = randomInt(0, 23)
		const scheduledAt = new Date(now.getTime() + (daysOffset * 24 + hoursOffset) * 60 * 60 * 1000)

		// Seleciona 1-3 contas aleatórias
		const numTargets = randomInt(1, 3)
		const shuffled = socialAccounts.sort(() => 0.5 - Math.random())
		const targets = shuffled.slice(0, numTargets)

		const status = scheduledAt < now ? 'PUBLISHED' : 'SCHEDULED'
		const publishedAt = status === 'PUBLISHED' ? scheduledAt : null

		await prisma.post.create({
			data: {
				user: { connect: { id: user.id } },
				content: faker.lorem.sentences(randomInt(1, 3)),
				imageUrl: faker.image.urlPlaceholder?.() || `https://picsum.photos/seed/${i}/800/600`,
				media: { placeholder: true, seed: i },
				scheduledAt,
				publishedAt,
				status,
				accounts: {
					connect: targets.map((t) => ({ id: t.id })),
				},
			},
		})
	}

	console.log(`Seed finalizado: 1 user, ${socialAccounts.length} social accounts, ${postsToCreate} posts criados.`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

