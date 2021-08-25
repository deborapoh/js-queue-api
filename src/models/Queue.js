class Queue {
  constructor() {
    this.size = 0
    this.queue = []
  }

  resetQueue() {
    this.size = 0
    this.queue = []
  }

  enqueue(message) {
    this.queue.push(message)
    this.size++
  }

  requeue(message) {
    const index = this.queue.findIndex(item => item.messageId === message.messageId)
    this.queue.push(message)
    this.queue.splice(index, 1)
  }

  dequeue(messageId) {
    if (this.isEmpty()) {
      return
    }

    this.size--

    const index = this.queue.findIndex(item => item.messageId === messageId)
    this.queue.splice(index, 1)
  }

  peek() {
    let i = 0
    let message = null

    if (this.isEmpty()) return message

    while (true) {
      if (!this.queue[i]) break

      if (this.queue[i].status === 'pending') {
        message = this.queue[i]
        break
      }

      i++
    }

    return message
  }

  isEmpty() {
    return this.queue.length === 0
  }
}

export default Queue
