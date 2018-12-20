const RootQuery = {
	IUser: {
		__resolveType(users) {
			if (users.user) {
				return 'User'
			}
			return null
		}
	},
	Result: {
		__resolveType(obj) {
			if (obj.message) {
				return 'Error'
			}
			if (obj.user) {
				return 'User'
			}
			if (obj.token) {
				return 'Token'
			}
			return null
		}
	},
	Query: {
		dummy: () => 'dodo duck lives here'
	}
}

export default RootQuery
