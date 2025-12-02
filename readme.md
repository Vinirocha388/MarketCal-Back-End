# 📅 MarketCal - Backend

## 🚀 Sobre

API backend construída com **Node.js + Express + Prisma** para gerenciamento de publicações em redes sociais. Inclui autenticação JWT, CRUD completo e seed com dados de teste.

**Stack:** Node.js • Express • Prisma ORM • SQLite • JWT • bc---

## 💾 Banco de Dados

Este projeto utiliza **SQLite** como banco de dados, o que torna a configuração mais simples e não requer instalação de servidores externos.

---

## ⚡ Quick Start

```bash
# 1. Clone e instale dependências
git clone https://github.com/Vinirocha388/MarketCal-Back-End.git
cd MarketCal-Back-End
npm install

# 2. Configure o .env
DATABASE_URL="file:./prisma/dev.db"
PORT=4000
JWT_SECRET="sua_chave_secreta_aqui"

# 3. Configure o Prisma
npx prisma generate
npm run prisma:seed

# 4. Rode o servidor
npm run dev
```

🎉 Servidor rodando em `http://localhost:4000`

---

## 📡 Endpoints Principais

### Público (sem autenticação)

```http
POST /auth/register    # Criar novo usuário
POST /auth/login       # Fazer login (retorna JWT token)
```

### Protegido (requer header `Authorization: Bearer {token}`)

```http
GET    /auth/users           # Listar usuários
GET    /social-accounts      # Listar contas sociais
POST   /social-accounts      # Criar conta social
GET    /posts                # Listar posts
POST   /posts                # Criar post agendado
```

---

## 📝 Exemplos de Requisições

### 1️⃣ Registrar Novo Usuário

```http
POST http://localhost:4001/auth/register
Content-Type: application/json

{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": 2,
    "name": "Maria Silva",
    "email": "maria@email.com"
  }
}
```

---

### 2️⃣ Fazer Login

```http
POST http://localhost:4001/auth/login
Content-Type: application/json

{
  "email": "admin@marketcal.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "message": "Login realizado!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin MarketCal",
    "email": "admin@marketcal.com"
  }
}
```

> 🔑 **Copie o token e use nas próximas requisições!**

---

### 3️⃣ Listar Usuários (Protegido)

```http
GET http://localhost:4001/auth/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 4️⃣ Criar Conta Social (Protegido)

```http
POST http://localhost:4001/social-accounts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Instagram Empresa",
  "platform": "Instagram",
  "handle": "@minhaempresa",
  "userId": 1
}
```

**Resposta:**

```json
{
  "id": 21,
  "name": "Instagram Empresa",
  "platform": "Instagram",
  "handle": "@minhaempresa",
  "userId": 1,
  "createdAt": "2025-11-06T12:00:00.000Z"
}
```

---

### 5️⃣ Listar Contas Sociais (Protegido)

```http
GET http://localhost:4001/social-accounts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 6️⃣ Criar Post Agendado (Protegido)

```http
POST http://localhost:4001/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "content": "Novo produto lançado! 🚀 Confira em nosso site!",
  "imageUrl": "https://picsum.photos/1080/1080",
  "scheduledAt": "2025-11-10",
  "userId": 1
}
```

**Resposta:**

```json
{
  "id": 101,
  "content": "Novo produto lançado! 🚀 Confira em nosso site!",
  "imageUrl": "https://picsum.photos/1080/1080",
  "scheduledAt": "2025-11-10",
  "status": "SCHEDULED",
  "userId": 1,
  "createdAt": "2025-11-06T12:00:00.000Z"
}
```

---

### 7️⃣ Listar Todos os Posts (Protegido)

```http
GET http://localhost:4001/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 8️⃣ Buscar Post por ID (Protegido)

```http
GET http://localhost:4001/posts/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 9️⃣ Atualizar Post (Protegido)

```http
PUT http://localhost:4001/posts/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "content": "Conteúdo atualizado!",
  "status": "PUBLISHED"
}
```

---

### 🔟 Deletar Post (Protegido)

```http
DELETE http://localhost:4001/posts/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta:**

```json
{
  "message": "Post removido com sucesso"
}
```

---

## 📁 Estrutura

```
src/
├── controllers/     # Lógica de negócio
├── middleware/      # Middleware de autenticação
├── models/          # Modelos Prisma
├── routes/          # Definição de rotas
└── server.js        # Entrada da aplicação

prisma/
├── schema.prisma    # Schema do banco
├── migrations/      # Histórico de migrations
└── seed/           # Dados de teste
```

---

## 🛠️ Scripts

```bash
npm run dev                    # Desenvolvimento (hot-reload)
npm run prisma:generate        # Gerar Prisma Client
npm run prisma:migrate:dev     # Rodar migrations
npm run prisma:seed            # Popular banco de dados
npx prisma studio              # Interface visual do banco
```

---

## 🐛 Troubleshooting

| Problema            | Solução                                                              |
| ------------------- | -------------------------------------------------------------------- |
| Erro JWT            | Verifique se `JWT_SECRET` está no `.env` e se o token está no header |
| Prisma Client error | Execute `npx prisma generate`                                        |
| Porta em uso        | Altere `PORT` no `.env`                                              |

---

## � Banco de Dados

Este projeto utiliza **SQLite** como banco de dados, o que torna a configuração mais simples e não requer instalação de servidores externos.

O arquivo do banco é criado automaticamente em `prisma/dev.db` após rodar as migrations.

Para visualizar e editar os dados do banco, use:

```bash
npx prisma studio
```

---

<div align="center">

**⭐ Se este projeto ajudou você, deixe uma estrela!**

</div>
