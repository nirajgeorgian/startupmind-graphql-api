import UserModel from '../users/model'
import JobsModel from './model'
import CompanyModel from '../company/model'
import { errMsg } from '../../utils/message'

const createJobs = async (_: Object, { input }: Object, { req }: Object) => {
	const { id, type } = req.user
	if (type !== 'COMPANY_USER') {
		return errMsg('Please log in with company profile account')
	}
	const user = await UserModel.findById(id)
	if (!user) {
		return errMsg('No user Exists')
	}
	const company = await CompanyModel.findById(input.company)
	if (!company) {
		return errMsg('No company exists on your behalf')
	}
	const job = new JobsModel(input)
	job.created_by = id
	company.jobs.push(job.id)
	try {
		await job.save()
		await company.save()
	} catch (e) {
		return errMsg(e.message)
	}
	return job
}

const JobsMutation = {
	Mutation: {
		createJobs
	}
}

export default JobsMutation
