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

export default router
