import express from "express";
import cors from "cors";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

//criar rotas

app.post("/cadastro", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      idade: req.body.idade,
    },
  });
  res.status(201).json(req.body);
});

app.put("/cadastro/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.user.update({
    where: { id: id },
    data: {
      email: req.body.email,
      name: req.body.name,
      idade: req.body.idade,
    },
  });
  res.status(200).json(req.body);
});

app.delete("/cadastro/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: id },
  });
  res.status(204).send();
});

app.get("/cadastro", async (req, res) => {
  const lista_usuarios = await prisma.user.findMany();

  res.status(200).json(lista_usuarios);
});

app.get("/cadastro/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await prisma.user.findUnique({
    where: { id },
  });

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.status(200).json(usuario);
});

//configurar porta do server
app.listen(3000, () => {
  console.log("SERVIDOR RODANDO");
});
