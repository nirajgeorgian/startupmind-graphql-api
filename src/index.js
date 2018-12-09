const Sentry = require('@sentry/node')
import express from 'express'
import { ApolloEngine } from 'apollo-engine'

import GraphQLServer from './server'

Sentry.init({
	dsn: 'https://4ec59da5ab13485d9ae142f1ed87577f@sentry.io/1340275',
	maxBreadcrumbs: 50,
	debug: true,
	environment: 'production'
})
const app = express()
GraphQLServer.applyMiddleware({
	app
})
const GraphQLEngine = new ApolloEngine({
	apiKey: process.env.API_ENGINE_KEY,
	logging: {
		level: 'ERROR' // Engine Proxy logging level. DEBUG, INFO (default), WARN or ERROR.
	}
})

export { GraphQLEngine, GraphQLServer }
export default app
