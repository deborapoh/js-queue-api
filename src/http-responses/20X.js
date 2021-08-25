export class HttpOK {
  constructor (content) {
    this.content = content
    this.statusCode = 200
    this.statusText = 'OK'
  }
}

export class HttpCreated {
  constructor (content) {
    this.content = content
    this.statusCode = 201
    this.statusText = 'Created'
  }
}
