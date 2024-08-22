import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Adicione esta linha
import { hashPassword } from "../repositories/passwordUtils.js";
import authenticateToken from "../middleware/authenticateToken.js";

const prisma = new PrismaClient();

async function todos(req, res) {
  return res.json("hello world");
}
async function usuarios(req, res) {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// REGISTRA O USUARIO
async function registrar(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//FAZ LOGIN NESSA PORRA
async function login(req, res) {
  try {
    // 1. Extrai o email e a senha do corpo (body) da requisição
    const { email, password } = req.body;

    // 2. Busca o usuário no banco de dados com base no email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // 3. Verifica se o usuário existe
    if (!user) {
      // Se o usuário não for encontrado, retorna um erro de autenticação
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Verifica se a senha fornecida é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Se a senha não for válida, retorna um erro de autenticação
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5. Gera um token JWT (JSON Web Token) com as informações do usuário
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    // 6. Retorna o token e o ID do usuário como resposta da requisição
    res.json({ token, userId: user.id });
  } catch (error) {
    // 7. Caso ocorra algum erro durante o processo, retorna o erro com um status 400 (Bad Request)
    res.status(400).json({ message: error.message });
  }
}

// BUSCA UM USUARIO
async function umUsuario(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        tasks: true,
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

// EDITA O USUARIO
async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      include: {
        tasks: true,
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

export default {
  registrar,
  login,
  usuarios,
  todos,
  umUsuario,
  editarUsuario,
  me,
};
