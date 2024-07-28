import express, { json } from "express"; //Importando o express, json do Express
import cors from "cors";
import path from "path";
import authRouter from "./routes/authRouter.js";
import cartasRouter from "./routes/cartasRouter.js";

const app = express();
app.use(cors());

app.use(
  "/images",
  express.static(path.join(path.dirname(import.meta.url), "images"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.use(cartasRouter);
app.use(authRouter);

export default app;
