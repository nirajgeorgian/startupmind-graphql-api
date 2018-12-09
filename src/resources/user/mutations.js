import UserModel from './model'
import { ErrorMessage } from '../../utils/Message'
import { getUser } from './methods'
// import { development } from '../../config/logger'

const signup = async (_, { input }) => {
	const { email, username } = input
	const oldUser = await UserModel.findOne({ $or: [{ email, username }] })
	if (oldUser) {
		return ErrorMessage('User already exists')
	}
	const user = new UserModel(input)
	try {
		await user.save()
	} catch (e) {
		return ErrorMessage(e.message)
	}
	return getUser(user)
}

const UserMutations = {
	Mutation: {
		signup
	}
}
export default UserMutations
