import UserModel from '../model'
import token from '../../../utils/token'
import { errMsg } from '../../../utils/message'
import { generateJwtToken } from '../../../middlewares/auth/jwt.auth'
import { getUser } from './methods'
// import { development } from '../../config/logger'

const userSignup = async (_: Object, { input }: Object) => {
	const { email, username } = input
	let oldUser
	try {
		oldUser = await UserModel.findOne({ $or: [{ username }, { email }] })
	} catch (e) {
		return errMsg('server error')
	}
	if (oldUser) {
		return errMsg('User already exists')
	}
	let user
	try {
		user = new UserModel(input)
	} catch (e) {
		return errMsg(`Error: ${e.message}`)
	}
	user.user = user.type
	user.hashPassword()
	user.token.default = token(20)
	try {
		await user.save()
	} catch (e) {
		return errMsg(e.message)
	}
	return getUser(user)
}

const userLogin = async (_: Object, { input }: Object): Object => {
	const { email, password } = input
	const user = await UserModel.findOne({ email })
	if (!user) {
		return errMsg('No user Exists')
	}
	if (!user.verifyPassword(password)) {
		return errMsg('password do not match')
	}
	return {
		type: user.user,
		token: `Bearer ${generateJwtToken({ id: user.id, type: user.type })}`
	}
}

const UserMutations = {
	Mutation: {
		userSignup,
		userLogin
	}
}
export default UserMutations
