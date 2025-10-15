// Importa as biblioteca, banco db, e prisma (uma fremework que ajuda na sixtaxe)

import express from 'express';
import pkg from '@prisma/client'; 
const { PrismaClient } = pkg;

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

const users = []


// POST serve para mandar as infor

app.post('/usuarios', async (req, res) => {

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  });

  users.push(req.body)
  res.status(201).json()
  res.send("OK post")

})

// Get consulta, pegando informação do banco

app.get('/usuarios', async (req, res) => {
  let users = []

  if (req.query.name) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    users = await prisma.user.findMany()
  }

  res.status(200).json(users)
})

// PUT serve para editar dados, do servidor 

app.put('/usuarios/:id', async (req, res) => {

  await prisma.user.update({
    where: {
      id: req.params.id
    },

    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  });
})
// DELETE serve para deletar do banco de dados

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id // 👈 usar como string
      }
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//  Porta para rodar o localHost 

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});