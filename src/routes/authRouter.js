import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/sigin", authController.sigin);
authRouter.get("/geral", authController.geral);

export default authRouter;
