// Importa o módulo 'Router' do Express para criar um roteador de rotas.
import { Router } from "express";

// Importa o controlador de autenticação que contém as funções para lidar com requisições relacionadas a autenticação.
import authController from "../controllers/authController.js";

// Importa o middleware de autenticação que protege rotas exigindo um token válido.
import authenticateToken from "../middleware/authenticateToken.js";

// Cria uma nova instância do roteador Express.
const authRouter = Router();

// Define uma rota POST para o endpoint '/registrar' que chama o método 'registrar' do controlador de autenticação.
authRouter.post("/registrar", authController.registrar);

// Define uma rota POST para o endpoint '/login' que chama o método 'login' do controlador de autenticação.
authRouter.post("/login", authController.login);

// Define uma rota GET para o endpoint '/users' que chama o método 'usuarios' do controlador de autenticação.
// Esta rota lista todos os usuários (não é necessário autenticação).
authRouter.get("/users", authController.usuarios);

// Define uma rota GET para o endpoint '/users/:id' que chama o método 'umUsuario' do controlador de autenticação.
// Esta rota recupera os detalhes de um usuário específico baseado no ID fornecido (não é necessário autenticação).
authRouter.get("/users/:id", authController.umUsuario);

// Define uma rota PUT para o endpoint '/users/:id' que chama o método 'editarUsuario' do controlador de autenticação.
// Esta rota permite a atualização dos detalhes de um usuário específico baseado no ID fornecido.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
authRouter.put("/users/:id", authenticateToken, authController.editarUsuario);

// Define uma rota GET para o endpoint '/me' que chama o método 'me' do controlador de autenticação.
// Esta rota retorna as informações do usuário autenticado atual, protegido pelo middleware 'authenticateToken'.
authRouter.get("/me", authenticateToken, authController.me);

// Exporta o roteador de autenticação para ser usado em outras partes da aplicação, como o arquivo principal do servidor.
export default authRouter;
