import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 3000

// Root route '/'
app.get('/', (req, res) => {
  res.send('Welcome to the simple Node API!')
})

// Middleware to process JSON
app.use(express.json())

// Routes
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
