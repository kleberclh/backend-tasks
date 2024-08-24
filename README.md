# Task Management API

Bem-vindo à API de Gerenciamento de Tarefas! Esta API fornece funcionalidades para criar, atualizar, listar e excluir projetos e tarefas, com autenticação baseada em token.

## Índice

1. [Descrição](#descrição)
2. [Funcionalidades](#funcionalidades)
3. [Instalação](#instalação)
4. [Uso](#uso)
5. [Rotas da API](#rotas-da-api)
6. [Contribuição](#contribuição)
7. [Licença](#licença)

## Descrição

Esta API permite gerenciar projetos e tarefas associadas a esses projetos. Os usuários podem autenticar-se para acessar funcionalidades protegidas e realizar operações sobre projetos e tarefas.

## Funcionalidades

- **Gerenciamento de Projetos**
  - Criar, listar, atualizar e excluir projetos.
- **Gerenciamento de Tarefas**
  - Criar, listar, atualizar e excluir tarefas associadas a projetos.
- **Autenticação**
  - Registro e login de usuários.
  - Proteção de endpoints com autenticação baseada em token.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/task-management-api.git
   cd task-management-api
Instale as dependências:

bash
Copiar código
npm install
Configure o banco de dados e as variáveis de ambiente. Renomeie o arquivo .env.example para .env e preencha as variáveis necessárias.

Inicie o servidor:

bash
Copiar código
npm start
Uso
A API está disponível em http://localhost:5000 (por padrão). Utilize ferramentas como Postman ou cURL para interagir com a API.

Rotas da API
Autenticação
Registrar Usuário

POST /registrar
Corpo da solicitação:
json
Copiar código
{
  "username": "string",
  "password": "string"
}
Login

POST /login
Corpo da solicitação:
json
Copiar código
{
  "username": "string",
  "password": "string"
}
Resposta:
json
Copiar código
{
  "token": "jwt-token"
}
Obter Usuários

GET /users
Obter Usuário

GET /users/:id
Atualizar Usuário

PUT /users/:id
Headers: Authorization: Bearer <token>
Corpo da solicitação:
json
Copiar código
{
  "username": "string",
  "password": "string"
}
Obter Dados do Usuário Autenticado

GET /me
Headers: Authorization: Bearer <token>
Projetos
Criar Projeto

POST /projects
Headers: Authorization: Bearer <token>
Corpo da solicitação:
json
Copiar código
{
  "name": "string"
}
Listar Projetos

GET /projects
Headers: Authorization: Bearer <token>
Atualizar Projeto

PUT /projects/:id
Headers: Authorization: Bearer <token>
Corpo da solicitação:
json
Copiar código
{
  "name": "string"
}
Excluir Projeto

DELETE /projects/:id
Headers: Authorization: Bearer <token>
Criar Tarefa

POST /projects/:projectId/tarefas
Headers: Authorization: Bearer <token>
Corpo da solicitação:
json
Copiar código
{
  "name": "string",
  "description": "string"
}
Listar Tarefas

GET /projects/:projectId/tarefas
Headers: Authorization: Bearer <token>
Atualizar Tarefa

PUT /projects/:projectId/tarefas/:tarefaId
Headers: Authorization: Bearer <token>
Corpo da solicitação:
json
Copiar código
{
  "name": "string",
  "description": "string"
}
Excluir Tarefa

DELETE /projects/:projectId/tarefas/:tarefaId
Headers: Authorization: Bearer <token>
Contribuição
Contribuições são bem-vindas! Por favor, envie um pull request ou abra um issue para relatar bugs ou sugerir melhorias.

Licença
Este projeto está licenciado sob a MIT License.



### Instruções de Uso

- **Clone o repositório**: Use a URL correta do seu repositório do GitHub.
- **Configure as variáveis de ambiente**: Adapte o arquivo `.env.example` para o ambiente de execução.
- **Atualize as URLs da API e as descrições das rotas**: Certifique-se de que refletem a estrutura real da sua API.

Esse `README.md` fornece uma visão geral completa do projeto, incluindo instalação, uso e detalhes das rotas da API. Ajuste conforme necessário para se adequar ao seu projeto específico.
