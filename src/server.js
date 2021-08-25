import app from '~/app'
import constants from '~/config/constants'

const { API_PORT } = constants

app.listen(API_PORT, () => {
  console.log(`App serving on port ${API_PORT}...`)
})
