import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const taskRouter = Router();

taskRouter.post("/users/:id/tasks", taskController.registrar);
taskRouter.get("/users/:id/tasks", taskController.listar);


export default taskRouter;