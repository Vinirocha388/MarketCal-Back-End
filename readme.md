# MarketCal - Backend

## 📋 SPRINT 2: Construção do Backend e Banco de Dados

### 🎯 Meta da Sprint
Ter uma **API 100% funcional**, segura, documentada e com dados, pronta para ser consumida pelo frontend.

---
## 🚀 Processo para Inicializar o Projeto

fei 

1. Pré-requisitos
    - Node.js (>= 18), npm ou yarn
    - PostgreSQL em execução
    - Git

2. Clonar repositório
```bash
git clone <repo-url>
cd <repo-dir>
```

3. Instalar dependências
```bash
npm install
# ou
yarn
```

4. Configurar variáveis de ambiente
- Criar arquivo `.env` a partir de `.env.example` e ajustar valores:
```env
DATABASE_URL=""
PORT=
JWT_SECRET="sua_chave_secreta"
```

5. Inicializar Prisma (gerar cliente e aplicar migrations)
```bash
npx prisma generate
```


6. Rodar em modo desenvolvimento
```bash
npm run dev
```

7. Build e produção
```bash
npm run build
npm start
```
Dicas rápidas:
- Criar branch de feature: git checkout -b feat/init-project
- Commit frequente e pull antes de push
- Manter `.env` fora do controle de versão (adicionar ao .gitignore)
- Incluir scripts úteis em package.json para facilitar o fluxo de desenvolvimento

## 📅 Cronograma

**Semana 2:** Terça, 04/11/2025 e Quinta, 06/11/2025

---

## 📝 Tarefas Planejadas

### 1️⃣ Setup (Backend)
- Configuração do projeto Node.js
- Configuração do Express/NestJS
- Configuração do Prisma

### 2️⃣ Banco de Dados - Conexão
- Conexão com o PostgreSQL
- Execução das migrations (baseadas no DER da Sprint 1)

### 3️⃣ Desenvolvimento (Core)
- Implementação dos CRUDs essenciais
- Exemplo: Usuários
- Implementação da Autenticação JWT

### 4️⃣ Desenvolvimento (Regras)
- Implementação dos CRUDs secundários
- Implementação das regras de negócio complexas

### 5️⃣ Banco de Dados - População
- Criação dos scripts seeds
- Execução dos scripts para popular o banco
- **Mínimo de 100 itens** no banco de dados

### 6️⃣ Testes (API)
- Teste de todos os endpoints
- Finalização da Documentação da API no Postman

---

## 📦 Entrega Esperada
✅ API testada e funcionando  
✅ Banco de dados populado com dados de teste  

---

## 🧪 Testando a API no Postman

### 🚀 **Passo 1: Inicie o servidor**
```bash
npm start
```

### 📋 **Requisições disponíveis:**

#### **1️⃣ REGISTRAR USUÁRIO** (primeira coisa a fazer!)
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/register`
- **Body:** `raw` → `JSON`
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

---

#### **2️⃣ FAZER LOGIN** (pegar o token)
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/login`
- **Body:** `raw` → `JSON`
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```
**⚠️ IMPORTANTE:** Copie o `token` que vier na resposta! Você vai precisar dele nas próximas requisições.

---

#### **3️⃣ LISTAR USUÁRIOS** (precisa do token)
- **Método:** `GET`
- **URL:** `http://localhost:3000/auth/users`
- **Headers:** 
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`

---

#### **4️⃣ CRIAR CONTA SOCIAL** (precisa do token)
- **Método:** `POST`
- **URL:** `http://localhost:3000/social-accounts`
- **Headers:** 
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`
- **Body:** `raw` → `JSON`
```json
{
  "name": "Instagram da Empresa",
  "platform": "Instagram",
  "handle": "@minhaempresa",
  "userId": 1
}
```

---

#### **5️⃣ LISTAR CONTAS SOCIAIS** (precisa do token)
- **Método:** `GET`
- **URL:** `http://localhost:3000/social-accounts`
- **Headers:** 
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`

---

#### **6️⃣ CRIAR POST** (precisa do token)
- **Método:** `POST`
- **URL:** `http://localhost:3000/posts`
- **Headers:** 
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`
- **Body:** `raw` → `JSON`
```json
{
  "content": "Meu primeiro post agendado!",
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "scheduledAt": "2025-11-06",
  "userId": 1
}
```

---

#### **7️⃣ LISTAR POSTS** (precisa do token)
- **Método:** `GET`
- **URL:** `http://localhost:3000/posts`
- **Headers:** 
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`

---

### 💡 **Dicas importantes:**

1. **Sempre comece pelo registro e login!**
2. **Copie o token do login** e use em todas as outras requisições
3. **Para adicionar o token:** Vá em `Headers` → adicione `Authorization` → cole `Bearer SEU_TOKEN`
4. **Troque `SEU_TOKEN_AQUI`** pelo token real que você recebeu no login
5. **O `userId`** geralmente será `1` para o primeiro usuário

---
✅ Documentação completa dos endpoints  

---

## 🛠️ Stack Tecnológico
- **Runtime:** Node.js
- **Framework:** Express/NestJS
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT



