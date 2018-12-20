const Sentry = require('@sentry/node')
import compression from 'compression'
import bodyParser from 'body-parser'

import cors from './cors'
// import hosts from './hosts'
import ignoreRequest from './ignReq'
import security from './security'
import toobusy from './toobussy'
import { verifyJwt } from './auth/jwt.auth'
import { development } from '../config/logger'

Sentry.init({
	dsn: 'https://4ec59da5ab13485d9ae142f1ed87577f@sentry.io/1340275',
	maxBreadcrumbs: 50,
	debug: true,
	environment: 'production'
})

export default (app) => {
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.set('trust proxy', true)
	app.use(compression())
	app.use(toobusy)
	cors(app)
	// hosts(app)
	ignoreRequest(app)
	security(app)
	app.use('/graphql', verifyJwt)
	development('ALl middlewares loaded')
}
