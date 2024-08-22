import { Router } from "express";
import authController from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const authRouter = Router();

authRouter.post("/registrar", authController.registrar);
authRouter.post("/login", authController.login);
authRouter.get("/users", authController.usuarios);
authRouter.get("/users/:id", authController.umUsuario);
authRouter.get("/me", authenticateToken, authController.me);

export default authRouter;
