import { v4 as uuidv4 } from 'uuid'

import { MESSAGE_STATUS } from '~/utils/enum'

class Message {
  constructor(textMessage, processingTime = 1) {
    this.messageId = uuidv4()
    this.textMessage = textMessage
    this.processingTime = processingTime
    this.status = 'pending'
    this.try = 0
    this.createdAt = new Date()
    this.updatedAt = null
  }

  updateMessage() {
    this.updatedAt = new Date()
    this.status = 'pending'
  }

  setStatus(statusId) {
    this.updatedAt = new Date()
    if (statusId === 'processing') {
      this.try++
    }

    this.status = MESSAGE_STATUS[statusId]
  }
}

export default Message
