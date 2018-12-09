import mongoose from 'mongoose'
import { development } from '../logger'

/*
 * @mongodb connection
 * Database connection for nosql database
 */
const mongoUrl = `mongodb://${process.env.MONGO_SERVER_HOST}:${process.env.MONGO_SERVER_PORT}/${
	process.env.MONGO_SERVER_DATABASE
}`
mongoose.connect(
	mongoUrl,
	{
		autoReconnect: true,
		useNewUrlParser: true,
		useCreateIndex: true
	}
)
process.env.NODE_ENV === 'development' && mongoose.set('debug', true)
const mongodb = mongoose.connection
const mongoConnect = new Promise((resolve, reject) => {
	mongodb.once('open', () => {
		development(`Connected to ${mongoUrl} nosql mongo database 🚀`)
		resolve(mongodb)
	})
	mongodb.on('error', (err) => {
		development(`error connection to mongodb database due to ${err.message}`)
		reject(err.message)
		process.exit()
	})
})

const resolveAllDbConnection = async () => {
	await mongoConnect()
}

export { mongodb }
export default resolveAllDbConnection()
