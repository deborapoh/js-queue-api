import express from 'express'

import handleErrors from '~/middleware/handle-error'
import routes from '~/routes'

const app = express()

app.use(express.json())
app.use('/', routes)
app.use(handleErrors)

export default app
