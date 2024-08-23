import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "JSON inválido" });
  }
  next(err);
});
app.use(authRouter);
app.use(taskRouter);
app.use(projectRouter);

export default app;
