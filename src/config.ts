import dotenv from 'dotenv'
dotenv.config()
import env from 'env-var'

interface Conf {
	[key: string]: any
}
const envConf: Conf = {
	api_key: env.get('API_KEY').required().asString(),
	port: env.get('PORT').default('80').asPortNumber(),
	public: env.get('PUBLIC').default('false').asBool(),
	db_file: env.get('DB_FILE').default('/data/db.json').asString(),
	feed_title: env.get('FEED_TITLE').default('My Reading List').asString(),
	feed_desc: env.get('FEED_DESCRIPTION').default('Articles to read later').asString(),
}

export default envConf
