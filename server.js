  import express from 'express';
  import pkg from '@prisma/client'; // usa o client padrão
  const { PrismaClient } = pkg;

  const prisma = new PrismaClient()
  const app = express()

  app.use(express.json())

  const users = []


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

  app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users)

  })

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



  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
  });