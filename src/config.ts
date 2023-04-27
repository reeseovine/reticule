import dotenv from 'dotenv'
dotenv.config()

// TODO: do some processing on the env variables, include some sane defaults

interface Shape {
	key: string
	def: string | number | boolean // default value ('default' is a reserved keyword, so i used 'def')
	env: string
	validate?: (value: any) => boolean
}
const confSchema: Shape[] = [
	{
		key: 'port',
		def: 80,
		env: 'PORT',
	},
	{
		key: 'api_key',
		def: '',
		env: 'API_KEY',
		validate: (value) => typeof value === 'string' && value.length > 0,
	},
	{
		key: 'public',
		def: false,
		env: 'PUBLIC',
	},
	{
		key: 'db_file',
		def: '/data/db.json',
		env: 'DB_FILE',
		validate: (value) => typeof value === 'string' && value.length > 0,
	},
	{
		key: 'feed_title',
		def: 'Reading list',
		env: 'FEED_TITLE',
	},
	{
		key: 'feed_desc',
		def: 'Articles saved to be read later',
		env: 'FEED_DESCRIPTION',
	},
]

interface Conf {
	[name: string]: string | number | boolean
}
let envConf: Conf = {}
for (var item of confSchema) {
	envConf[item.key] = (process.env[item.env] as string | number | boolean | undefined) || item.def
}

export default envConf
