class InternalServerError extends Error {
  constructor (errorMessage) {
    super()
    this.error = errorMessage
    this.statusCode = 500
    this.statusText = 'Internal Server Error'
  }
}

export default InternalServerError
