import constants from '~/config/constants'
import Message from '~/models/Message'

export const consumeMessages = (messageQueue) => {
  const { MAX_NUMBER_OF_MESSAGES_PER_REQUEST } = constants.QUEUE
  const messagesProcessing = []

  for (let i = 0; i < MAX_NUMBER_OF_MESSAGES_PER_REQUEST; i++) {
    const message = messageQueue.peek()

    if (!message) break

    message.setStatus('processing')
    messagesProcessing.push(message)
  }

  return messagesProcessing
}

export const produceMessage = (messageParams, messageQueue) => {
  const { textMessage, processingTime } = messageParams

  const message = new Message(textMessage, processingTime)
  messageQueue.enqueue(message)

  return message.messageId
}
