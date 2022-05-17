import config from './config'
import { app } from './app'

app().listen(config.port, () => console.info(`Listening on port ${config.port}`))
