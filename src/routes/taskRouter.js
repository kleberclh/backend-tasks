import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.post("/tasks", taskController.registrar);
taskRouter.get("/tasks", taskController.listar);
taskRouter.put("/tasks/:id", taskController.atualizar); // Rota para atualizar uma tarefa
taskRouter.delete("/tasks/:id", taskController.deletar); // Rota para deletar uma tarefa

export default taskRouter;
