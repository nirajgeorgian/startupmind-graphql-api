import '../../config/env'
import { mongoConnect, mongodb } from '../../config/database'

/*
 * setup and teardown before every request
 */
beforeAll(async () => {
	await mongoConnect()
})

afterAll(async () => {
	mongodb.close()
})
