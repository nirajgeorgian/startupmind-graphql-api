module.exports = {
	displayName: 'test',
	testEnvironment: 'node',
	rootDir: './',
	verbose: true,
	moduleFileExtensions: ['js'],
	transform: {
		'\\.(gql|graphql)$': 'jest-transform-graphql',
		'^.+\\.js$': 'babel-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$'
}
