import '../config'
import request from '../config/request'

describe('Dummy Schema test', () => {
	test('Query dummy return Hello World', async (done) => {
		const query = `
		query {
				dummy
			}
		`
		const {
			data: { dummy }
		} = await request(query, {}, {})
		expect(dummy).toBe('dodo duck lives here')
		done()
	})

	test('Mutation dummy returns Dodo Duck', async (done) => {
		const mutation = `
		mutation {
			dummy
		}`
		const {
			data: { dummy }
		} = await request(mutation, {}, {})
		expect(dummy).toBe('Dodo Duck')
		done()
	})
})
