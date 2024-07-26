import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Adicione esta linha
import { hashPassword } from "../repositories/passwordUtils.js";

const prisma = new PrismaClient();

async function todos(req, res) {
  return res.json("hello world");
}
async function geral(req, res) {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function signup(req, res) {
  const { name, username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).send({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).send({ message: "Error creating user", error });
  }
}

async function sigin(req, res) {
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

    // 6. Retorna o token como resposta da requisição
    res.json({ token });
  } catch (error) {
    // 7. Caso ocorra algum erro durante o processo, retorna o erro com um status 400 (Bad Request)
    res.status(400).json({ message: error.message });
  }
}

export default {
  signup,
  sigin,
  geral,
  todos,
};
