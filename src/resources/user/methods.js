export const getUser = (resutluser) => {
	const { firstname, lastname, email, username, gender, verified, created_at, updated_at, user } = resutluser
	return {
		firstname,
		lastname,
		email,
		username,
		gender,
		verified,
		created_at,
		updated_at,
		user
	}
}
