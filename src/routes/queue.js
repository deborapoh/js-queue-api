import express from 'express'

import Queue from '~/models/Queue'

import { produceMessage, consumeMessages } from '~/controllers/queue'

import { HttpCreated, HttpOK } from '~/http-responses/20X'

import { getRequiredParamsForMessage } from '~/utils/params-parser'
import { processMessages } from '~/utils/fake-processing'

const router = express.Router()
const messageQueue = new Queue()

router.get('/consume', async (req, res, next) => {
  try {
    let httpResponse

    if (messageQueue.isEmpty()) {
      httpResponse = new HttpOK({ message: 'There are no messages to process :D' })
      return res.status(httpResponse.statusCode).send(httpResponse)
    }

    const messagesProcessing = consumeMessages(messageQueue)
    httpResponse = new HttpOK({ messagesProcessing })
    res.status(httpResponse.statusCode).send(httpResponse)

    processMessages(messagesProcessing, messageQueue)
  } catch (error) {
    next(error)
  }
})

router.post('/produce', async (req, res, next) => {
  try {
    const messageParams = getRequiredParamsForMessage(req.body)
    const messageId = produceMessage(messageParams, messageQueue)

    const httpResponse = new HttpCreated({ messageId })
    return res.status(httpResponse.statusCode).send(httpResponse)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const httpResponse = new HttpOK({ messageQueue })
    return res.status(httpResponse.statusCode).send(httpResponse)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    messageQueue.resetQueue()
    const httpResponse = new HttpOK()
    return res.status(httpResponse.statusCode).send(httpResponse)
  } catch (error) {
    next(error)
  }
})

export default router
