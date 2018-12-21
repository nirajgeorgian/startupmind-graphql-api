const development = require('debug')('development')
const Sentry = require('@sentry/node')
import { IsUserError } from './UserError'
/**
 * [queryRegex finding the exact type of error with regex]
 * //  => should be kept inside these pipes
 * \s => start with any whitespace ex: tab, form feed
 * *  => matches the previous one or more time
 * | => matches any one of the two from either side
 * ^ => immediate following match. Matces begining of input
 * @type {[type]}
 */
const queryRegex = /\s*(query|mutation)[^{]*/
const collectQueries = (query) => {
	if (!query) return 'No Query'
	return query
		.split('\n')
		.map((line) => {
			const match = line.match(queryRegex)
			return match ? match[0].trim() : ''
		})
		.filter((line) => !!line)
		.join('\n')
}

const errorPath = (error) => {
	if (!error.path) return ''
	return error.path
		.map((value, index) => {
			if (!index) return value
			return typeof value === 'number' ? `[${value}]` : `.${value}`
		})
		.join('')
}

export const logGraphQLError = (req, error) => {
	development('-----GraphQLError-----')
	development(error)
	if (req) {
		development(collectQueries(req.body.query))
		development('variables', JSON.stringify(req.body.variables || {}))
	}
	const path = errorPath(error)
	path && development(path)
	development('---------------------\n')
}

const createGraphQLErrorFormatter = (req) => (error) => {
	logGraphQLError(req, error)

	let sentryId = 'SENTRY_ID only generated in production'
	const isUserError = error.originalError ? error.originalError[IsUserError] : error[IsUserError]
	if (!isUserError) {
		if (process.env.NODE_ENV === 'production') {
			Sentry.captureException(error)
		}
	}
	return {
		message: isUserError ? error.message : `Internal server error: ${sentryId}`,
		// Hide the stack trace in production mode
		stack: !process.env.NODE_ENV === 'production' ? error.stack.split('\n') : null
	}
}

export default createGraphQLErrorFormatter
