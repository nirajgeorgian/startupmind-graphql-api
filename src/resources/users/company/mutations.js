import UserModel from '../model'
import JobsModel from '../../jobs/model'
import token from '../../../utils/token'
import { errMsg } from '../../../utils/message'
import { generateJwtToken } from '../../../middlewares/auth/jwt.auth'
import { getCompanyUser } from './methods'

const compUserSignup = async (_: Object, { input }: Object) => {
	const { email, username } = input
	const oldUser = await UserModel.findOne({ $or: [{ username }, { email }] })
	if (oldUser) {
		return errMsg('User already exists')
	}
	const user = new UserModel(input)
	user.companyUser = user.type
	user.hashPassword()
	user.token.default = token(20)
	try {
		await user.save()
	} catch (e) {
		return errMsg(e.message)
	}
	return getCompanyUser(user)
}

const compUserLogin = async (_: Object, { input }: Object): Object => {
	const { email, password } = input
	const user = await UserModel.findOne({ email })
	if (!user) {
		return errMsg('No user Exists')
	}
	if (!user.verifyPassword(password)) {
		return errMsg('password do not match')
	}
	return {
		type: user.companyUser,
		token: `Bearer ${generateJwtToken({ id: user.id, type: user.type })}`
	}
}

const CompanyUserMutations = {
	Mutation: {
		compUserSignup,
		compUserLogin
	}
}

export default CompanyUserMutations
