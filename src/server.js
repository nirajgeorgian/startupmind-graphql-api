import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import costAnalysis from 'graphql-cost-analysis'

import schema from './schema'
import UserError from './utils/UserError'
import createGraphQLError from './utils/create-graphql-error-formatter'

class ProtectedApolloServer extends ApolloServer {
	async createGraphQLServerOptions(req, res) {
		const options = await super.createGraphQLServerOptions(req, res)
		return {
			...options,
			validationRules: [
				costAnalysis({
					maximumCost: 750,
					defaultCost: 1,
					variables: req.body.variables,
					createError: (max, actual) => {
						const err = new UserError(
							`GraphQL query exceeds maximum complexity, please remove nesting. (max: ${max}, actual: ${actual})`
						)
						return err
					}
				})
			]
		}
	}
}
// Initialize Apollo Server
const GraphQLServer = new ProtectedApolloServer({
	schema,
	formatError: createGraphQLError(),
	context: ({ req, res }) => ({
		req,
		res
	}),
	playground: {
		settings: {
			'editor.theme': 'dark'
		}
	},
	maxFileSize: 25 * 1024 * 1024, // 25MB
	// make sure that tracing and cacheControl are both enabled
	introspection: true,
	tracing: true,
	cacheControl: true,
	engine: false,
	validationRules: [depthLimit(5)]
})

export default GraphQLServer
