import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registrar(req, res) {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "O título é obrigatório" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: "Pendente", // Define o status padrão como "Pendente"
        userId,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listar(req, res) {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { status, title, description } = req.body;
    const userId = req.user.id;

    console.log("ID da Tarefa:", id);
    console.log("ID do Usuário:", userId);

    const task = await prisma.task.updateMany({
      where: { id: Number(id), userId },
      data: { title, description, status },
    });

    if (task.count === 0) {
      console.log("Nenhuma tarefa encontrada com esse ID e userId.");
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json({ message: "Tarefa atualizada com sucesso", task });
  } catch (err) {
    console.error("Erro ao atualizar a tarefa:", err.message);
    res.status(500).json({ message: err.message });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.deleteMany({
      where: { id: Number(id), userId },
    });

    if (task.count === 0) {
      return res.status(404).json({ message: "Tarefa não encontradas" });
    }

    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  registrar,
  listar,
  atualizar,
  deletar,
};
