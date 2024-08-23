import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  console.log("User:", req.user);
};

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

//RELACIONADO A TAREFA DO PROJETO AGORA
async function createTarefa(req, res) {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const tarefa = await prisma.tarefas.create({
      data: {
        name,
        description,
        projectId: project.id,
      },
    });

    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
}

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

    const tarefas = await prisma.tarefas.findMany({
      where: { projectId: project.id },
    });

    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
}

async function updateTarefa(req, res) {
  try {
    const { projectId, tarefaId } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    const tarefa = await prisma.tarefas.update({
      where: { id: Number(tarefaId) },
      data: { name, description },
    });

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
}

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

    await prisma.tarefas.delete({
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
