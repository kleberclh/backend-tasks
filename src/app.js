import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(taskRouter);

export default app;
