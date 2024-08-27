import { Router } from "express";

import taskController from "../controllers/taskController.js";

import authenticateToken from "../middleware/authenticateToken.js";

const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.post("/tasks", taskController.registrar);

taskRouter.get("/tasks", taskController.listar);

taskRouter.put("/tasks/:id", taskController.atualizar);

taskRouter.delete("/tasks/:id", taskController.deletar);

export default taskRouter;
