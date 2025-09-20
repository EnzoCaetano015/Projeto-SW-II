# CRUD de Usuários – Fullstack (React + Node + Prisma)

Este projeto é um CRUD simples de usuários, com **frontend em React** e **backend em Node.js + Prisma**.  
Permite **cadastrar, listar, editar e excluir usuários**, com integração direta ao banco de dados.

---

## 📂 Estrutura do Projeto

├── Back/ # Backend (Node.js + Express + Prisma)
│ ├── server.js
│ ├── prisma/
│ └── package.json
│
├── Front/ # Frontend (React + Vite + MUI + React Query)
│ ├── src/
│ ├── vite.config.ts
│ └── package.json

---

## ⚡ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-repo.git
cd seu-repo


cd Back
npm install
npx prisma db push
npm start


cd Front
npm install
npm run dev

Como funciona

Cadastro de usuários:
Preencha o formulário no card da esquerda (nome, idade, email) e clique em Cadastrar.
O usuário será salvo no banco via POST /cadastro e aparecerá na lista à direita.

Listagem de usuários:
A lista da direita consome GET /cadastro.
Os dados são carregados automaticamente via React Query.

Edição de usuários:
Clique no botão ✏️ → os dados do usuário aparecem no formulário.
Após editar, clique em Salvar Alterações → envia PUT /cadastro/:id.
O formulário volta ao modo de cadastro depois da atualização.

Exclusão de usuários:
Clique no botão 🗑️ → o usuário é removido via DELETE /cadastro/:id.
A lista é recarregada automaticamente.

ecnologias usadas
🔹 Frontend

React
 + Vite

TypeScript

Material UI
 (design moderno com glassmorphism)

React Query
 (requisições e cache)

Axios

🔹 Backend

Node.js

Express

Prisma ORM
 (modelagem e queries)

[Mongo] (configurável no .env)

CORS
```
