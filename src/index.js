import express from 'express'
import createGraphQLLogger from 'graphql-log'
import { ApolloEngine } from 'apollo-engine'

import GraphQLServer from './server'
import middlewares from './middlewares'
import { resolvers } from './server'

const logExections = createGraphQLLogger({
	prefix: 'resolvers: '
})
if (process.env.NODE_ENV === 'development') {
	logExections(resolvers)
}

const app = express()
middlewares(app)
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
