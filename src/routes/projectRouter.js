import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import projectController from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post(
  "/projects",
  authenticateToken,
  projectController.createProject
);

projectRouter.get(
  "/projects",
  authenticateToken,
  projectController.getProjects
);

projectRouter.put(
  "/projects/:id",
  authenticateToken,
  projectController.updateProject
);

projectRouter.delete(
  "/projects/:id",
  authenticateToken,
  projectController.deleteProject
);

projectRouter.post(
  "/projects/:projectId/tarefas",
  authenticateToken,
  projectController.createTarefa
);

projectRouter.get(
  "/projects/:projectId/tarefas",
  authenticateToken,
  projectController.getTarefas
);

projectRouter.put(
  "/projects/:projectId/tarefas/:tarefaId",
  authenticateToken,
  projectController.updateTarefa
);

projectRouter.delete(
  "/projects/:projectId/tarefas/:tarefaId",
  authenticateToken,
  projectController.deleteTarefa
);

export default projectRouter;
