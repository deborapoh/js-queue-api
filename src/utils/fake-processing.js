import constants from '~/config/constants'

const { PROCESSING_WAITING_TIME_IN_SECONDS } = constants.QUEUE

export const processMessages = (messagesProcessing, messageQueue) => {
  messagesProcessing.forEach(msg => {
    const t = setInterval(() => console.log(`PROCESSING ${msg.messageId} ...`), 1000)

    const fakeTimeoutSTO = setTimeout(() => {
      fakeTimeout(msg, messageQueue, t, fakeProcessSTO)
    }, PROCESSING_WAITING_TIME_IN_SECONDS * 1000)

    const fakeProcessSTO = setTimeout(() => {
      fakeProcess(msg, messageQueue, t, fakeTimeoutSTO)
    }, msg.processingTime * 1000)
  })
}

const fakeTimeout = (msg, messageQueue, t, sto) => {
  msg.updateMessage()
  messageQueue.requeue(msg)
  clearInterval(t)
  clearTimeout(sto)
  console.log(`
    X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X
    TIMEOUT for ${msg.messageId}. Took more than ${PROCESSING_WAITING_TIME_IN_SECONDS}s. Sending to the end of queue.
    X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X
    `)
}

const fakeProcess = (message, messageQueue, t, sto) => {
  const { messageId } = message

  // this is just a way of setting different processing times for different messages
  clearInterval(t)
  clearTimeout(sto)
  messageQueue.dequeue(messageId)
  console.log(`
    ==============================================
    FINISHED ${messageId}
    ==============================================
    `)
}
