import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/registrar", authController.registrar);
authRouter.post("/login", authController.login);
authRouter.get("/users", authController.usuarios);
authRouter.get("/users/:id", authController.umUsuario);

export default authRouter;
