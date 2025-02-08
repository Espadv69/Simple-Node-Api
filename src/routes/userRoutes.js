import express from 'express'

const router = express.Router()

// Simulated DataBase
let users = [
  { id: 1, name: 'Aitor' },
  { id: 2, name: 'Alice' },
]

// Get all users (GET /users)
router.get('/', (req, res) => {
  res.json(users)
})

// Get an user per ID (GET /users/:id)
router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = users.find((u) => u.id === parseInt(id))

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
})

// Create a new user (POST /users)
router.post('/', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const newUser = { id: users.length + 1, name }
  users.push(newUser)
  res.status(201).json(newUser)
})

// Update an user (PUT /users/:id)
router.put('/.id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const user = users.find((u) => u.id === parseInt(id))

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  user.name = name
  res.json(user)
})

// Delete an user (DELETE /users/:id)
router.delete('/.id', (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex((u) => u.id === parseInt(id))

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' })
  }

  users.splice(userIndex, 1)
  res.status(204).send()
})

export default router
