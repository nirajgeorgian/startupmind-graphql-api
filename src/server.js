import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import costAnalysis from 'graphql-cost-analysis'
import merge from 'lodash.merge'

import UserError from './utils/UserError'
import createGraphQLError from './utils/create-graphql-error-formatter'

/*
 * Import all the GraphQl Schema files
 */
import RootSchema from './resources/root/schema.graphql'
import UserSchema from './resources/users/user/schema.graphql'
import CompanyUserSchema from './resources/users/company/schema.graphql'
import InvestorSchema from './resources/users/investor/schema.graphql'
import CompanySchema from './resources/company/schema.graphql'
import JobSchema from './resources/jobs/schema.graphql'
import OpenSourceSchema from './resources/opensource/schema.graphql'
import ResumeSchema from './resources/resume/schema.graphql'
import ReviewsSchema from './resources/reviews/schema.graphql'

/*
 * Import all the GraphQl Mutations file
 */
import RootMutation from './resources/root/mutations'
import UserMutation from './resources/users/user/mutations'
import CompanyUserMutation from './resources/users/company/mutations'
import CompanyMutation from './resources/company/mutatiions'
import JobMutations from './resources/jobs/mutations'

/*
 * Import all the Graphql Queries file
 */
import RootQuery from './resources/root/queries'
import UserQuery from './resources/users/user/queries'
import JobsQuery from './resources/jobs/queries'

export const resolvers = merge(
	{},
	// Mutations
	RootMutation,
	UserMutation,
	CompanyUserMutation,
	CompanyMutation,
	JobMutations,

	// Queries
	RootQuery,
	UserQuery,
	JobsQuery
)

/*
 * form a Schema by combining all the graphql files
 */
const typeDefs = [
	RootSchema,
	UserSchema,
	CompanyUserSchema,
	InvestorSchema,
	CompanySchema,
	JobSchema,
	OpenSourceSchema,
	ResumeSchema,
	ReviewsSchema
]
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

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
