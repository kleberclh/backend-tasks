import express, { json } from "express"; //Importando o express, json do Express

import authRouter from "./routes/authRouter.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.use(authRouter);

export default app;
