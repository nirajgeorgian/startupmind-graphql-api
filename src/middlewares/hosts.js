import hostValidation from 'host-validation'

export default (app) => {
	const hosts = ['127.0.0.1:3000/graphql', 'http://localhost:3000/graphql', process.env.API_URL]

	app.use(
		hostValidation({
			hosts
		})
	)
}
