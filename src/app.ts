import express, { NextFunction, Request, Response, Express } from 'express'
import 'express-async-errors'

import route from './routes/route'

export const app = (app = express()): Express => {
	route(app)

	app.use((_, response) => response.sendStatus(404))
	app.use((error: Error, _: Request, __: Response, next: NextFunction) => {
		console.error(error)
		next(error)
	})

	return app
}
