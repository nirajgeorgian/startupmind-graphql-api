import UserModel from './model'
import token from '../../utils/token'
import { errMsg } from '../../utils/message'
import { getUser } from './methods'
import { generateJwtToken } from '../../middlewares/auth/jwt.auth'
// import { development } from '../../config/logger'

const signup = async (_, { input }) => {
	const { email, username } = input
	const oldUser = await UserModel.findOne({ $or: [{ username }, { email }] })
	if (oldUser) {
		return errMsg('User already exists')
	}
	const user = new UserModel(input)
	user.hashPassword()
	user.token.default = token()
	try {
		await user.save()
	} catch (e) {
		return errMsg(e.message)
	}
	return getUser(user)
}

const login = async (_, { input }) => {
	const { email, password } = input
	const user = await UserModel.findOne({ email })
	if (!user) {
		return errMsg('No user Exists')
	}
	if (!user.verifyPassword(password)) {
		return errMsg('password does not match')
	}
	return {
		token: `Bearer ${generateJwtToken({ id: user.id })}`
	}
}

const UserMutations = {
	Mutation: {
		signup,
		login
	}
}
export default UserMutations
