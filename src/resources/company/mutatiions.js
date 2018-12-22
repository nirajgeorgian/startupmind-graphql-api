import UserModel from '../users/model'
import CompanyModel from './model'
import { errMsg } from '../../utils/message'

const createCompany = async (_: Object, { input }: Object, { req }: Object) => {
	const { id, type } = req.user
	if (type !== 'COMPANY_USER') {
		return errMsg('Please log in with company profile account')
	}
	const user = await UserModel.findById(id)
	if (!user) {
		return errMsg('No user Exists')
	}
	const oldCompany = await CompanyModel.findOne({ name: input.name })
	if (oldCompany) {
		return errMsg('Company already exists')
	}
	const company = new CompanyModel(input)
	company.created_by = id
	try {
		await company.save()
	} catch (e) {
		return errMsg(e.message)
	}
	return company
}

const CompanyMutations = {
	Mutation: {
		createCompany
	}
}

export default CompanyMutations
