// Importa o módulo 'Router' do Express para criar um roteador de rotas.
import { Router } from "express";

// Importa o controlador de tarefas que contém as funções para lidar com requisições relacionadas a tarefas.
import taskController from "../controllers/taskController.js";

// Importa o middleware de autenticação que protege rotas exigindo um token válido.
import authenticateToken from "../middleware/authenticateToken.js";

// Cria uma nova instância do roteador Express.
const taskRouter = Router();

// Aplica o middleware 'authenticateToken' a todas as rotas definidas neste roteador.
// Isso garante que todas as rotas abaixo exigem autenticação para serem acessadas.
taskRouter.use(authenticateToken);

// Define uma rota POST para o endpoint '/tasks' que chama o método 'registrar' do controlador de tarefas.
// Esta rota é usada para criar uma nova tarefa.
taskRouter.post("/tasks", taskController.registrar);

// Define uma rota GET para o endpoint '/tasks' que chama o método 'listar' do controlador de tarefas.
// Esta rota é usada para listar todas as tarefas.
taskRouter.get("/tasks", taskController.listar);

// Define uma rota PUT para o endpoint '/tasks/:id' que chama o método 'atualizar' do controlador de tarefas.
// Esta rota permite a atualização dos detalhes de uma tarefa específica baseada no ID fornecido.
taskRouter.put("/tasks/:id", taskController.atualizar); // Rota para atualizar uma tarefa

// Define uma rota DELETE para o endpoint '/tasks/:id' que chama o método 'deletar' do controlador de tarefas.
// Esta rota permite a exclusão de uma tarefa específica baseada no ID fornecido.
taskRouter.delete("/tasks/:id", taskController.deletar); // Rota para deletar uma tarefa

// Exporta o roteador de tarefas para ser usado em outras partes da aplicação, como o arquivo principal do servidor.
export default taskRouter;
