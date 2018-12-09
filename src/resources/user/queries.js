import UserModel from './model'
import { ErrorMessage } from '../../utils/Message'
import { getUser } from './methods'

const user = async (_, { id }) => {
	try {
		const user = await UserModel.findById(id)
		if (!user) {
			return ErrorMessage('no user exists')
		}
		return getUser(user)
	} catch (e) {
		return ErrorMessage(e.message)
	}
}

const UserQuery = {
	Query: {
		user
	}
}

export default UserQuery
