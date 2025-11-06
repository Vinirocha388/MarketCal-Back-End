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
✅ Documentação completa dos endpoints  

---

## 🛠️ Stack Tecnológico
- **Runtime:** Node.js
- **Framework:** Express/NestJS
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT

---

## 🚀 Status

| Tarefa | Status |
|--------|--------|
| Setup (Backend) | ⏳ Em Progresso |
| Banco de Dados (Conexão) | ⏳ Em Progresso |
| Desenvolvimento (Core) | ⏳ Em Progresso |
| Desenvolvimento (Regras) | ⏳ Não Iniciado |
| Banco de Dados (População) | ⏳ Não Iniciado |
| Testes (API) | ⏳ Não Iniciado |

