import GeneralError from '~/http-responses/GeneralError'

export class MissingParamError extends GeneralError {
  constructor(paramName) {
    super()
    this.error = `Required parameter: ${paramName}`
    this.statusCode = 400
    this.statusText = 'Missing Param Error'
  }
}
