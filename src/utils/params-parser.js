import { MissingParamError } from '~/http-responses/40X'

export const getRequiredParamsForMessage = body => {
  const { textMessage, processingTime } = body

  if (!textMessage) throw new MissingParamError('textMessage')

  return {
    textMessage,
    processingTime
  }
}
