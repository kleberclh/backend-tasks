import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função para criar um novo projeto
export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};

// Função para obter todos os projetos de um usuário
async function getProjects(req, res) {
  try {
    const userId = req.user.id;

    const projects = await prisma.project.findMany({
      where: { userId },
      include: { tarefas: true },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
}

// Função para atualizar um projeto existente
async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.updateMany({
      where: { id: Number(id), userId },
      data: { name },
    });

    if (project.count === 0) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json({ message: "Projeto atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
}

// Função para deletar um projeto existente
async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.deleteMany({
      where: { id: Number(id), userId },
    });

    if (project.count === 0) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
}

// Função para criar uma nova tarefa associada a um projeto
async function createTarefa(req, res) {
  try {
    const { projectId } = req.params;
    const { name, description, status = "Pendente" } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        name,
        description,
        status,
        projectId: project.id,
      },
    });

    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
}

// Função para obter todas as tarefas de um projeto específico
async function getTarefas(req, res) {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const tarefas = await prisma.tarefa.findMany({
      where: { projectId: project.id },
    });

    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
}

// src/controllers/projectController.js

async function updateTarefa(req, res) {
  try {
    const { projectId, tarefaId } = req.params;
    const { name, description, status } = req.body; // Inclua o status

    console.log("Atualizando tarefa:", { name, description, status }); // Adicione um log para verificar os dados recebidos

    const tarefa = await prisma.tarefa.update({
      where: { id: Number(tarefaId) },
      data: { name, description, status }, // Atualiza o status
    });

    res.json(tarefa);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error.message);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
}

// Função para deletar uma tarefa existente
async function deleteTarefa(req, res) {
  try {
    const { projectId, tarefaId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    await prisma.tarefa.delete({
      where: { id: Number(tarefaId) },
    });

    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
}

export default {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  createTarefa,
  getTarefas,
  updateTarefa,
  deleteTarefa,
};
