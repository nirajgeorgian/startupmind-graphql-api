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
			if (obj.companyUser) {
				return 'CompanyUser'
			}
			if (obj.job) {
				return 'Job'
			}
			if (obj.company) {
				return 'Company'
			}
			if (obj.token) {
				return 'Token'
			}
			return null
		}
	},
	Node: {
		__resolveType(obj) {
			if (obj.job) {
				return 'Job'
			}
			return null
		}
	},
	Query: {
		dummy: () => 'dodo duck lives here'
	}
}

export default RootQuery
