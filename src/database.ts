import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import config from './config.js'
import { Article, LowData } from './types.js'

let defaultData: LowData = {articles: []}
let adapter = new JSONFile<LowData>(config.db_file as string)
let db = new Low<LowData>(adapter, defaultData)
await db.read()

export default db
