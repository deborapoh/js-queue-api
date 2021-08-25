import GeneralError from '~/http-responses/GeneralError'
import InternalServerError from '~/http-responses/50X'

const handleErrors = async (err, req, res, next) => {
  console.log(`${JSON.stringify(err, Object.getOwnPropertyNames(err))}`)

  if (err instanceof GeneralError) {
    res.status(err.statusCode).json(err)
    return
  }

  res.status(500).json(new InternalServerError(err.message))
}

export default handleErrors
