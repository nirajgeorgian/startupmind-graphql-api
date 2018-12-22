import { UserInputError } from 'apollo-server-express'
import JobsModel from './model'

const jobs = async (_, { input }) => {
	const page = input.page ? input.page : 1
	const sort = input.sort ? input.sort : 'asc'
	const first = input.first ? input.first : 0
	const skip = (page - 1) * first
	const after = input.after ? input.after : null
	const offset = input.offset ? input.offset : 0
	if (first < 0) {
		throw new UserInputError('first must be positive')
	}
	const totalCount = await JobsModel.find({}).count()
	const jobs = await JobsModel.find({})
		.skip(skip + offset)
		.limit(first)
		.sort(sort)
	const hasNextPage = page * first < totalCount
	let edges, pageInfo
	if (jobs.length !== 0) {
		edges = {
			cursor: jobs[0].id,
			node: jobs
		}
		pageInfo = {
			endCursor: jobs[jobs.length - 1].id,
			hasNextPage
		}
	} else {
		edges = {
			cursor: '',
			node: jobs
		}
		pageInfo = {
			endCursor: '',
			hasNextPage: false
		}
	}
	return {
		edges,
		pageInfo,
		totalCount
	}
}

const jobsQuery = {
	Query: {
		jobs
	}
}

export default jobsQuery
