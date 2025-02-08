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

export default router
