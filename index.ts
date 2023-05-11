import cors from 'cors'
import express from 'express'
import db from './startup/db'
import router from './startup/router'

const app = express()

app.use(cors())
db()
router(app)

const server = app.listen(8000, () => {
  console.log('server stared')
})

export default server
