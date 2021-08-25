import supertest from 'supertest'

import api from '../../src/app'

const request = supertest(api)

describe('QUEUE MESSAGING', () => {
  jest.setTimeout(20000)
  const processingTime = 3
  console.log = jest.fn(() => { })

  it('SHOULD return an EMPTY message queue', async () => {
    const response = await request.get('/queue').send()

    expect(response.status).toStrictEqual(200)
    expect(response.body.statusText).toStrictEqual('OK')
    expect(response.body.content.messageQueue.size).toStrictEqual(0)
    expect(response.body.content.messageQueue.queue).toStrictEqual([])
  })

  it('SHOULD produce a message', async () => {
    const response = await request.post('/queue/produce').send({
      textMessage: 'testing producing message',
      processingTime
    })

    expect(response.status).toStrictEqual(201)
    expect(response.body.statusText).toStrictEqual('Created')
    expect(response.body.content.messageId).toBeTruthy()
  })

  it('SHOULD return a NOT EMPTY message queue', async () => {
    const response = await request.get('/queue').send()

    expect(response.status).toStrictEqual(200)
    expect(response.body.statusText).toStrictEqual('OK')
    expect(response.body.content.messageQueue.size).toStrictEqual(1)
    expect(response.body.content.messageQueue.queue[0]).toBeTruthy()
  })

  it('SHOULD consume messages', async () => {
    await request.post('/queue/produce').send({
      textMessage: 'testing producing message'
    })

    const queueRequest = await request.get('/queue').send()
    expect(queueRequest.body.content.messageQueue.size).toStrictEqual(2)

    const response = await request.get('/queue/consume').send()
    expect(response.status).toStrictEqual(200)
    expect(response.body.statusText).toStrictEqual('OK')
  })

  it('SHOULD delete queue', async () => {
    await request.delete('/queue').send()
    const queueRequest = await request.get('/queue').send()

    expect(queueRequest.body.content.messageQueue.size).toStrictEqual(0)
    expect(queueRequest.body.content.messageQueue.queue).toStrictEqual([])
  })

  it('SHOULD status change to processing', async () => {
    await request.post('/queue/produce').send({
      textMessage: 'testing producing message',
      processingTime
    })

    const queueRequest = await request.get('/queue').send()
    expect(queueRequest.body.content.messageQueue.queue[0].status).toStrictEqual('pending')

    const consumeRequest = await request.get('/queue/consume').send()
    expect(consumeRequest.body.content.messagesProcessing[0].status).toStrictEqual('processing')
  })
})
