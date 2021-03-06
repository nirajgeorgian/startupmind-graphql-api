module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				},
				useBuiltIns: 'entry',
				exclude: ['babel-plugin-transform-regenerator']
			}
		],
		'@babel/preset-flow'
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src']
			}
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-async-generators',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-object-rest-spread'
	]
}
