import express from 'express'
import cors from 'cors'
import path from 'path' // Usado para servir archivos estáticos
import { fileURLToPath } from 'url'

// Configuración para que funcione __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(cors()) // Habilita CORS
app.use(express.json()) // Habilita JSON en las peticiones
app.use(express.static(path.join(__dirname, '../public'))) // Servir archivos estáticos

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
  if (!name) {
    return res.status(400).json({ error: 'Name is requerid' })
  }

  const newUser = { id: users.length + 1, name }
  users.push(newUser)
  res.status(201).json(newUser)
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
    res.status(404).json({ error: 'User not found' })
  }
})

// Ruta para eliminar a usuario por ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex((u) => u.id === parseInt(id))

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' })
  }

  users.splice(userIndex, 1)
  res.status(204).send() // Sin contenido (204) cuando la eliminación es exitosa
})

// Servir el archivo index.html desde la carpeta 'public' cuando se accede a la raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
