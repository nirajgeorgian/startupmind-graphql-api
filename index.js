import './src/config/env'
import http from 'http'
import cluster from 'cluster'
import os from 'os'

import app, { GraphQLEngine, GraphQLServer } from './src'
import { development } from './src/config/logger'
import './src/config/database'

const port = process.env.PORT || 8080
const numCPUs = os.cpus().length

if (cluster.isMaster) {
	for (let i = 0; i < numCPUs; i += 1) {
		cluster.fork()
	}

	cluster.on('exit', (worker, code, signal) => {
		development(`worker ${worker.process.pid} died with signal ${signal}`)
	})
} else {
	const server = http.createServer(app)
	let currentApp = app
	GraphQLEngine.on('error', (err) => {
		development(`There was an error starting the server or Engine.\n ${err}`)

		// The app failed to start, we probably want to kill the server
		process.exit(1)
	})
	GraphQLEngine.listen({ port, httpServer: server }, () => {
		development(`🚀 Server ready at http://localhost:${port}${GraphQLServer.graphqlPath}`)
	})
	development(`Worker ${process.pid} started`)

	if (module.hot) {
		module.hot.accept('./src/index', () => {
			server.removeListener('request', currentApp)
			server.on('request', app)
			currentApp = app
		})
	}
}
