import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
