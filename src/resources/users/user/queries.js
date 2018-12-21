import UserModel from '../model'
import { errMsg } from '../../../utils/message'
import { getUser } from './methods'

const user = async (_, { id }) => {
	try {
		const user = await UserModel.findById(id)
		if (!user) {
			return errMsg('no user exists')
		}
		return getUser(user)
	} catch (e) {
		return errMsg(e.message)
	}
}

const UserQuery = {
	Query: {
		user
	}
}

export default UserQuery
