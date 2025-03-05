# Backend - My Tasks App

Este projeto é um backend para um sistema de gerenciamento de tarefas, usuários e autenticação. 
Ele permite que os usuários se cadastrem, façam login, criem projetos, adicionem tarefas a esses projetos, e gerenciem suas tarefas. O sistema de autenticação utiliza JWT (JSON Web Tokens) e criptografia de senhas com bcrypt.

## Tecnologias Utilizadas

- **Node.js** - JavaScript runtime para o backend.
- **Express.js** - Framework web para Node.js.
- **Prisma** - ORM para interação com o banco de dados.
- **bcrypt** - Biblioteca para criptografar senhas.
- **jsonwebtoken** - Biblioteca para gerar e verificar tokens JWT.
- **dotenv** - Gerenciamento de variáveis de ambiente.



## 📦 Instalação e Configuração

1. **Clone o repositório**
   ```sh
   git clone https://github.com/kleberclh/backend-tasks.git
   cd backend-tasks
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configuração do Banco de Dados**
   - Crie um arquivo `.env` na raiz do projeto e adicione:
     ```env
     PORT="5000"
     SECRET="sua_chave_secreta"
   
     ```

4. **Execute as migrações do banco**
   ```sh
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```sh
   npm start
   ```

---
