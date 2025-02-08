import express from 'express'
import cors from 'cors'
import path from 'path' // Usado para servir archivos estáticos

const app = express()
const port = 3000

// Permitir solicitudes de cualquier origen
app.use(cors())

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')))

// Lista de usuarios (simulamos una base de datos aquí)
let users = [
  { id: 1, name: 'Aitor' },
  { id: 2, name: 'Vanesa' },
  { id: 3, name: 'Pablo' },
]

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users)
})

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
  const { name } = req.body
  const newUser = { id: users.length + 1, name }
  users.push(newUser)
  res.status(201).join(newUser)
})

// Ruta para actualizar un usuario por ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const user = users.find((u) => u.id === parseInt(id))
  if (user) {
    user.name = name
    res.json(user)
  } else {
    res.status(400).json({ message: 'User not found' })
  }
})

// Ruta para eliminar a usuario por ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  users.filter((u) => u.id !== parseInt(id))
  res.status(204).send() // Sin contenido (204) cuando la eliminación es exitosa
})

// Servir el archivo index.html desde la carpeta 'public' cuando se accede a la raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
