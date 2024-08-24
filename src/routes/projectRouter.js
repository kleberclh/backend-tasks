// Importa o módulo 'Router' do Express para criar um roteador de rotas.
import { Router } from "express";

// Importa o middleware de autenticação que protege rotas exigindo um token válido.
import authenticateToken from "../middleware/authenticateToken.js";

// Importa o controlador de projeto que contém as funções para lidar com requisições relacionadas a projetos e tarefas.
import projectController from "../controllers/projectController.js";

// Cria uma nova instância do roteador Express.
const projectRouter = Router();

// Define uma rota POST para o endpoint '/projects' que chama o método 'createProject' do controlador de projeto.
// Esta rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.post(
  "/projects",
  authenticateToken,
  projectController.createProject
);

// Define uma rota GET para o endpoint '/projects' que chama o método 'getProjects' do controlador de projeto.
// Esta rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.get(
  "/projects",
  authenticateToken,
  projectController.getProjects
);

// Define uma rota PUT para o endpoint '/projects/:id' que chama o método 'updateProject' do controlador de projeto.
// Esta rota permite a atualização dos detalhes de um projeto específico baseado no ID fornecido.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.put(
  "/projects/:id",
  authenticateToken,
  projectController.updateProject
);

// Define uma rota DELETE para o endpoint '/projects/:id' que chama o método 'deleteProject' do controlador de projeto.
// Esta rota permite a exclusão de um projeto específico baseado no ID fornecido.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.delete(
  "/projects/:id",
  authenticateToken,
  projectController.deleteProject
);

// Define uma rota POST para o endpoint '/projects/:projectId/tarefas' que chama o método 'createTarefa' do controlador de projeto.
// Esta rota permite a criação de uma nova tarefa para um projeto específico baseado no ID do projeto fornecido.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.post(
  "/projects/:projectId/tarefas",
  authenticateToken,
  projectController.createTarefa
);

// Define uma rota GET para o endpoint '/projects/:projectId/tarefas' que chama o método 'getTarefas' do controlador de projeto.
// Esta rota recupera todas as tarefas associadas a um projeto específico baseado no ID do projeto fornecido.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.get(
  "/projects/:projectId/tarefas",
  authenticateToken,
  projectController.getTarefas
);

// Define uma rota PUT para o endpoint '/projects/:projectId/tarefas/:tarefaId' que chama o método 'updateTarefa' do controlador de projeto.
// Esta rota permite a atualização dos detalhes de uma tarefa específica baseada no ID da tarefa e no ID do projeto fornecidos.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.put(
  "/projects/:projectId/tarefas/:tarefaId",
  authenticateToken,
  projectController.updateTarefa
);

// Define uma rota DELETE para o endpoint '/projects/:projectId/tarefas/:tarefaId' que chama o método 'deleteTarefa' do controlador de projeto.
// Esta rota permite a exclusão de uma tarefa específica baseada no ID da tarefa e no ID do projeto fornecidos.
// A rota é protegida pelo middleware 'authenticateToken', exigindo um token válido para acessar.
projectRouter.delete(
  "/projects/:projectId/tarefas/:tarefaId",
  authenticateToken,
  projectController.deleteTarefa
);

// Exporta o roteador de projeto para ser usado em outras partes da aplicação, como o arquivo principal do servidor.
export default projectRouter;
