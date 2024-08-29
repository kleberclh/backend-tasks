// Importa o PrismaClient para interagir com o banco de dados, o jwt para gerar tokens,
// bcrypt para hash de senhas e a função hashPassword de um repositório externo.
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Adiciona a biblioteca bcrypt para hash de senhas.
import { hashPassword } from "../repositories/passwordUtils.js"; // Importa a função hashPassword.

const prisma = new PrismaClient(); // Cria uma instância do PrismaClient para interação com o banco de dados.

async function todos(req, res) {
  // Função para uma rota de exemplo que retorna uma mensagem simples.
  return res.json("hello world");
}

async function usuarios(req, res) {
  // Função para obter todos os usuários do banco de dados.
  try {
    const allUsers = await prisma.user.findMany(); // Busca todos os usuários.
    res.status(200).json(allUsers); // Retorna os usuários com status 200.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna erro com status 500 em caso de falha.
  }
}

// REGISTRA O USUÁRIO
async function registrar(req, res) {
  // Função para registrar um novo usuário.
  const { name, email, password } = req.body; // Desestrutura os dados do corpo da requisição.
  const hashedPassword = await hashPassword(password); // Hash da senha usando a função hashPassword.
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user); // Retorna o usuário criado com status 201.
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna erro com status 400 em caso de falha.
  }
}

// FAZ LOGIN NESSA PORRA
async function login(req, res) {
  // Função para fazer login de um usuário e gerar um token JWT.
  try {
    const { email, password } = req.body; // Extrai email e senha do corpo da requisição.

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    }); // Busca o usuário pelo email.

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" }); // Retorna erro 401 se usuário não encontrado.
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Verifica se a senha fornecida é válida.

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" }); // Retorna erro 401 se a senha for inválida.
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "10000h",
    }); // Gera um token JWT com uma validade de 10000 horas.

    res.json({ token, userId: user.id }); // Retorna o token e o ID do usuário.
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retorna erro com status 400 em caso de falha.
  }
}

// BUSCA UM USUÁRIO
async function umUsuario(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        tasks: true, // Relacionamento definido como "tasks" no modelo User
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// EDITA O USUÁRIO
async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, name, email } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha atual incorreta" });
    }

    const updatedData = { name, email };

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Erro ao editar usuário:", err.message);
    res.status(500).json({ message: err.message });
  }
}

async function me(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the token" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tasks: true,
        projects: {
          include: {
            tarefas: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Exporta todas as funções do controlador para serem usadas nas rotas.
export default {
  registrar,
  login,
  usuarios,
  todos,
  umUsuario,
  editarUsuario,
  me,
};
