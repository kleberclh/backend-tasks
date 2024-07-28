import { Router } from "express";
import cartasController from "../controllers/cartasController.js";

const cartasRouter = Router();

cartasRouter.get("/cartas", cartasController.listar);
// cartasRouter.get("/cartas/:id", cartasController.listarUma);
cartasRouter.post("/cartas", cartasController.criar);
// cartasRouter.put("/cartas/:id", cartasController.editar);
cartasRouter.delete("/cartas/:id", cartasController.deletar);

export default cartasRouter;
