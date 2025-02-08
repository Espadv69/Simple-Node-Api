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
