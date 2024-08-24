import { PrismaClient } from "@prisma/client";

// Cria uma instância do PrismaClient para interagir com o banco de dados.
const prisma = new PrismaClient();

// Função para registrar uma nova tarefa
async function registrar(req, res) {
  try {
    const { title, description } = req.body; // Extrai título e descrição da tarefa do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário autenticado.

    // Verifica se o título da tarefa foi fornecido.
    if (!title) {
      return res.status(400).json({ message: "O título é obrigatório" });
    }

    // Cria uma nova tarefa no banco de dados.
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });

    // Retorna a tarefa criada com status 201 (Created).
    res.status(201).json(task);
  } catch (err) {
    // Trata erros e retorna uma mensagem de erro com status 400 (Bad Request).
    res.status(400).json({ message: err.message });
  }
}

// Função para listar todas as tarefas de um usuário
async function listar(req, res) {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado.

    // Busca todas as tarefas associadas ao ID do usuário.
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    // Retorna a lista de tarefas.
    res.json(tasks);
  } catch (err) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ message: err.message });
  }
}

// Função para atualizar uma tarefa existente
async function atualizar(req, res) {
  try {
    const { id } = req.params; // Obtém o ID da tarefa a partir dos parâmetros da requisição.
    const { title, description } = req.body; // Extrai o novo título e descrição da tarefa do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário autenticado.

    // Atualiza a tarefa com o ID fornecido e que pertence ao usuário autenticado.
    const task = await prisma.task.updateMany({
      where: { id: Number(id), userId },
      data: { title, description },
    });

    if (task.count === 0) {
      // Se a tarefa não for encontrada, retorna um erro.
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Retorna uma mensagem de sucesso.
    res.json({ message: "Tarefa atualizada com sucesso" });
  } catch (err) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ message: err.message });
  }
}

// Função para deletar uma tarefa existente
async function deletar(req, res) {
  try {
    const { id } = req.params; // Obtém o ID da tarefa a partir dos parâmetros da requisição.
    const userId = req.user.id; // Obtém o ID do usuário autenticado.

    // Deleta a tarefa com o ID fornecido e que pertence ao usuário autenticado.
    const task = await prisma.task.deleteMany({
      where: { id: Number(id), userId },
    });

    if (task.count === 0) {
      // Se a tarefa não for encontrada, retorna um erro.
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Retorna uma mensagem de sucesso.
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ message: err.message });
  }
}

// Exporta todas as funções do controlador para serem usadas nas rotas.
export default {
  registrar,
  listar,
  atualizar,
  deletar,
};
