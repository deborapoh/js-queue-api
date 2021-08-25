import express from 'express'

import { HttpOK } from '~/http-responses/20X'
import queue from '~/routes/queue'

const router = express.Router()

// ROUTES
router.use('/queue', queue)

router.get('/', async (req, res, next) => {
  try {
    const httpResponse = new HttpOK({ message: 'We are online people!' })
    return res.status(httpResponse.statusCode).send(httpResponse)
  } catch (error) {
    next()
  }
})

export default router
