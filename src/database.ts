import { writeFile, existsSync, readFileSync, mkdir, PathLike } from 'fs'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { dirname } from 'path'

import config from './config.js'
import { Article, LowData } from './types.js'

const defaultData: LowData = {articles: []}
const adapter = new JSONFile<LowData>(config.db_file as string)
const db = new Low<LowData>(adapter, defaultData)
await db.read()

// let DB: Article[] = []
// let skipWriting = false

// let init = async () => {

	// let data
	// if (existsSync(config.db_file as PathLike)) {
	// 	data = readFileSync(config.db_file as PathLike).toString()
	// 	if (data.length > 0 && data !== '[]' && !(JSON.parse(data) as Article[])) {
	// 		console.error('Database file exists but is not valid! DATA WILL NOT BE SAVED!!')
	// 		skipWriting = true
	// 	} else {
	// 		DB = JSON.parse(data) as Article[]
	// 	}
	// }
// }

// let update = async () => {
// 	if (!skipWriting) {
// 		mkdir(dirname(config.db_file as string), { recursive: true }, (err) => {
// 			if (err) {
// 				console.error('Unable to create database directory!')
// 				throw err
// 			}

// 			writeFile(config.db_file as PathLike, JSON.stringify(DB), (err) => {
// 				if (err) {
// 					console.error('Unable to update database file!')
// 					throw err
// 				}
// 				console.log('Database written to file successfully.')
// 			})
// 		})
// 	}
// }

// await init()
export default {
	add: async (article: Article) => {
		db.data.articles.push(article)
		await db.write()
	},
	get: (index: number) => {
		if (index < 0){
			index += db.data.articles.length
		}
		return db.data.articles[index]
	},
	getAll: () => {
		return [...db.data.articles]
	}
}


/////// Below is my attempt to use sqlite3. I failed. Please help D:

// import config from './config'
// import { ArticleData } from 'article-parser'

// const db = require('better-sqlite3')(config.db_file)
// // prettier-ignore
// db.prepare(`
// 	CREATE TABLE articles(
// 		id           INT      PRIMARY KEY,
// 		url          TEXT,
// 		links        TEXT,
// 		title        TEXT,
// 		description  TEXT,
// 		image        TEXT,
// 		author       TEXT,
// 		content      TEXT,
// 		source       TEXT,
// 		published    TEXT,
// 		added        TEXT,
// 		ttr          INT
// 	)
// `).run()

// interface Article extends ArticleData {
// 	added: Date
// 	id: number
// }

// let insert = (article: Article) => {
// 	db.prepare(
// 		'INSERT INTO articles VALUES (@id, @url, @links, @title, @description, @image, @author, @content, @source, @published, @added, @ttr)'
// 	).run(article)
// }

// export { insert }
