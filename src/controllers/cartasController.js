import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listar(req, res) {
  try {
    const allCartas = await prisma.carta.findMany();
    res.status(200).json(allCartas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criar(req, res) {
  const {
    categoria,
    codigo,
    credito,
    entrada,
    parcela,
    administradora,
    imagem,
  } = req.body;

  try {
    const newCarta = await prisma.carta.create({
      data: {
        categoria,
        codigo,
        credito: credito.toString(),
        entrada: entrada.toString(),
        parcela: parcela.toString(),
        administradora,
        imagem,
      },
    });
    res.status(201).json(newCarta);
  } catch (error) {
    console.error("Erro ao inserir a carta:", error);
    res.status(500).json({ error: "Erro ao inserir a carta" });
  }
}

async function deletar(req, res) {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("ID inválido");
  }

  try {
    // Verifica se a carta existe
    const carta = await prisma.carta.findUnique({
      where: {
        id,
      },
    });

    if (!carta) {
      return res
        .status(404)
        .send(`A carta de número ${id} não existe ou foi removida`);
    }

    // Tenta excluir a carta
    const deletedCarta = await prisma.carta.delete({
      where: {
        id,
      },
    });

    if (deletedCarta) {
      res.status(200).send(`A carta de número ${id} foi excluída com sucesso!`);
    } else {
      res
        .status(404)
        .send(`A carta de número ${id} não existe ou foi removida`);
    }
  } catch (error) {
    console.error("Erro ao remover a carta:", error);
    res.status(500).send("Erro ao remover a carta");
  }
}

export default {
  listar,
  criar,
  deletar,
};
