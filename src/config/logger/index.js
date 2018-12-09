import debug from 'debug'

export const development = debug('development')
export const production = debug('production')
export const test = debug('test')
export const stag = debug('stag')
export const feature = debug('feature')
export const bug = debug('bug')

export const appRunningEnvironment = () => {
	/**
	 * Tell us in which mode we are currently executing ..
	 */
	development('Running in development mode 🚀')
	test('Running in test mode 🚀')
	stag('Running in stag mode 🚀')
	feature('Running in fearure mode 🚀')
	bug('Running in bug fix mode 🚀')
	production('Running in production mode 🚀')
}
