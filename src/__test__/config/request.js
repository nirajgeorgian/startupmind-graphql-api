import { graphql } from 'graphql'
import { makeExecutableSchema } from 'apollo-server-express'
import schema from '../../schema'

const request = (source, contextValue, variableValue, rootValue = {}) =>
	graphql({
		schema,
		source,
		contextValue,
		variableValue,
		rootValue
	})

export default request
