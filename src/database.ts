import fs from 'fs'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import config from './config.js'
import { Article, LowData } from './types.js'

let defaultData: LowData = { articles: [] }
let adapter = new JSONFile<LowData>(config.db_file as string)
let db = new Low<LowData>(adapter, defaultData)
await db.read()
if (db.data === null) {
	db.data = defaultData
	await db.write()
}

export default db
