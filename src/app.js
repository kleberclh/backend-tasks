// Importa o módulo 'express' para criar e configurar o aplicativo web.
import express from "express";

// Importa o módulo 'cors' para permitir requisições de diferentes origens.
import cors from "cors";

// Importa o roteador de autenticação que contém as rotas relacionadas à autenticação.
import authRouter from "./routes/authRouter.js";

// Importa o roteador de tarefas que contém as rotas para operações relacionadas a tarefas.
import taskRouter from "./routes/taskRouter.js";

// Importa o roteador de projetos que contém as rotas para operações relacionadas a projetos.
import projectRouter from "./routes/projectRouter.js";

// Cria uma nova instância do aplicativo Express.
const app = express();

// Configura o middleware CORS para permitir requisições de diferentes origens.
app.use(cors());

// Configura o middleware para analisar o corpo das requisições em formato JSON.
app.use(express.json());

// Configura o middleware para analisar o corpo das requisições com dados codificados em URL.
app.use(express.urlencoded({ extended: true }));

// Configura um middleware de erro personalizado para lidar com erros de sintaxe JSON.
app.use((err, req, res, next) => {
  // Verifica se o erro é uma instância de SyntaxError e se a requisição tem um corpo.
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Se for um erro de sintaxe JSON, retorna uma resposta com status 400 e uma mensagem de erro.
    return res.status(400).json({ message: "JSON inválido" });
  }
  // Passa o erro para o próximo middleware de erro.
  next(err);
});

// Adiciona o roteador de autenticação ao aplicativo Express para gerenciar rotas de autenticação.
app.use(authRouter);

// Adiciona o roteador de tarefas ao aplicativo Express para gerenciar rotas relacionadas a tarefas.
app.use(taskRouter);

// Adiciona o roteador de projetos ao aplicativo Express para gerenciar rotas relacionadas a projetos.
app.use(projectRouter);

// Exporta o aplicativo Express para ser utilizado em outros módulos, como o servidor.
export default app;
