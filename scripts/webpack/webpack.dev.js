const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
	entry: ['webpack/hot/poll?1000', './index'],
	watch: true,
	mode: 'development',
	devtool: 'sourcemap',
	resolve: {
		extensions: ['.js', '.json', '.graphql']
	},
	externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
	plugins: [
		new StartServerPlugin({
			name: 'server.js',
			nodeArgs: ['--inspect'] // allow debugging
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false
		})
	]
})
