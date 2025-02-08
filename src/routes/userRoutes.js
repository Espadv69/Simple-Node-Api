import express from 'express'

const router = express.Router()

// Get all users (GET /users)
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Aitor' },
    { id: 2, name: 'Vanesa' },
  ])
})

// Get an user per ID (GET /users/:id)
router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({ id, name: `User: ${id}` })
})

export default router
