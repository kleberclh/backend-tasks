import { PrismaClient } from "@prisma/client";

// Cria uma instância do PrismaClient para interagir com o banco de dados.
const prisma = new PrismaClient();

// Função para criar um novo projeto
export const createProject = async (req, res) => {
  try {
    const { name } = req.body; // Extrai o nome do projeto do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário a partir do token JWT.

    if (!userId) {
      // Se o ID do usuário não estiver presente, retorna um erro.
      return res.status(400).json({ error: "User ID is required" });
    }

    // Cria um novo projeto no banco de dados.
    const project = await prisma.project.create({
      data: {
        name,
        userId,
      },
    });

    // Retorna o projeto criado com status 201 (Created).
    res.status(201).json(project);
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    console.error("Erro ao criar projeto:", error);
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
  console.log("User:", req.user);
};

// Função para obter todos os projetos de um usuário
async function getProjects(req, res) {
  try {
    const userId = req.user.id; // Obtém o ID do usuário.

    // Busca todos os projetos associados ao ID do usuário e inclui as tarefas associadas.
    const projects = await prisma.project.findMany({
      where: { userId },
      include: { tarefas: true },
    });

    // Retorna a lista de projetos.
    res.json(projects);
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
}

// Função para atualizar um projeto existente
async function updateProject(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do projeto a partir dos parâmetros da requisição.
    const { name } = req.body; // Extrai o novo nome do projeto do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Atualiza o projeto com o ID e o ID do usuário.
    const project = await prisma.project.updateMany({
      where: { id: Number(id), userId },
      data: { name },
    });

    if (project.count === 0) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Retorna uma mensagem de sucesso.
    res.json({ message: "Projeto atualizado com sucesso" });
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
}

// Função para deletar um projeto existente
async function deleteProject(req, res) {
  try {
    const { id } = req.params; // Obtém o ID do projeto a partir dos parâmetros da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Deleta o projeto com o ID e o ID do usuário.
    const project = await prisma.project.deleteMany({
      where: { id: Number(id), userId },
    });

    if (project.count === 0) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Retorna uma mensagem de sucesso.
    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
}

// Função para criar uma nova tarefa associada a um projeto
async function createTarefa(req, res) {
  try {
    const { projectId } = req.params; // Obtém o ID do projeto a partir dos parâmetros da requisição.
    const { name, description } = req.body; // Extrai o nome e a descrição da tarefa do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Verifica se o projeto existe e está associado ao usuário.
    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Cria uma nova tarefa associada ao projeto.
    const tarefa = await prisma.tarefas.create({
      data: {
        name,
        description,
        projectId: project.id,
      },
    });

    // Retorna a tarefa criada com status 201 (Created).
    res.status(201).json(tarefa);
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
}

// Função para obter todas as tarefas de um projeto específico
async function getTarefas(req, res) {
  try {
    const { projectId } = req.params; // Obtém o ID do projeto a partir dos parâmetros da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Verifica se o projeto existe e está associado ao usuário.
    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Busca todas as tarefas associadas ao projeto.
    const tarefas = await prisma.tarefas.findMany({
      where: { projectId: project.id },
    });

    // Retorna a lista de tarefas.
    res.json(tarefas);
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
}

// Função para atualizar uma tarefa existente
async function updateTarefa(req, res) {
  try {
    const { projectId, tarefaId } = req.params; // Obtém os IDs do projeto e da tarefa a partir dos parâmetros da requisição.
    const { name, description } = req.body; // Extrai o novo nome e a nova descrição da tarefa do corpo da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Verifica se o projeto existe e está associado ao usuário.
    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Atualiza a tarefa com o ID fornecido.
    const tarefa = await prisma.tarefas.update({
      where: { id: Number(tarefaId) },
      data: { name, description },
    });

    // Retorna a tarefa atualizada.
    res.json(tarefa);
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
}

// Função para deletar uma tarefa existente
async function deleteTarefa(req, res) {
  try {
    const { projectId, tarefaId } = req.params; // Obtém os IDs do projeto e da tarefa a partir dos parâmetros da requisição.
    const userId = req.user.id; // Obtém o ID do usuário.

    // Verifica se o projeto existe e está associado ao usuário.
    const project = await prisma.project.findFirst({
      where: { id: Number(projectId), userId },
    });

    if (!project) {
      // Se o projeto não for encontrado, retorna um erro.
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Deleta a tarefa com o ID fornecido.
    await prisma.tarefas.delete({
      where: { id: Number(tarefaId) },
    });

    // Retorna uma mensagem de sucesso.
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    // Trata erros e retorna uma mensagem de erro com status 500 (Internal Server Error).
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
}

// Exporta todas as funções do controlador para serem usadas nas rotas.
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
