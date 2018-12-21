export const getCompanyUser = (resutluser: Object): Object => {
	const {
		firstname,
		lastname,
		email,
		username,
		gender,
		verified,
		created_at,
		updated_at,
		companyUser,
		type
	} = resutluser
	return {
		firstname,
		lastname,
		email,
		username,
		gender,
		verified,
		created_at,
		updated_at,
		companyUser,
		type
	}
}
