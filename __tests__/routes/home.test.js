import supertest from 'supertest'

import api from '../../src/app'

const request = supertest(api)

describe('HOME', () => {
  console.log = jest.fn(() => { })

  it('SHOULD be online', async () => {
    const response = await request.get('/').send()

    expect(response.status).toStrictEqual(200)
    expect(response.body.content.message).toStrictEqual('We are online people!')
  })
})
