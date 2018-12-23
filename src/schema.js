import { makeExecutableSchema } from 'apollo-server-express'
import merge from 'lodash.merge'

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
export const typeDefs = [
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
export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

export default schema
