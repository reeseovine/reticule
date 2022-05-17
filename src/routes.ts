import { Express, Router, Request, Response } from 'express'

import db from './database'
import config from './config'

import noCache from './middleware/no-cache'
import cacheForever from './middleware/cache-forever'

import { extract, ArticleData } from 'article-parser'
interface Article extends ArticleData {
	added: Date
	id: number
}

const router = Router()

router.get('/favicon.ico', cacheForever(), (_: Request, res: Response) => res.sendStatus(204))

router.get('/robots.txt', cacheForever(), (_: Request, res: Response) => {
	res.type('text/plain')
	res.send('User-agent: *\nDisallow: /')
})

router.get('/healthcheck', noCache(), (_: Request, res: Response) => {
	res.json({ timestamp: Date.now() })
})

router.get('/add', noCache(), (req: Request, res: Response) => {
	if (!req.query.key || req.query.key != config.api_key) {
		return res.sendStatus(401)
	}

	if (!req.query.url) {
		console.error('No URL given. Skipping...')
		return res.sendStatus(400)
	}
	console.info(`Adding ${req.query.url}`)
	let url = decodeURIComponent(req.query.url as string)

	extract(url)
		.then((article) => {
			db.add(
				Object.assign(article, {
					added: new Date(),
					id: Date.now(),
				}) as Article
			)
			return res.sendStatus(200)
		})
		.catch((err) => {
			console.trace(err)
			return res.sendStatus(500)
		})
})

router.get('/json', (req: Request, res: Response) => {
	if (!req.query.key || req.query.key != config.api_key) {
		console.warn(`Unauthorized json read attempt from ${req.ip} !`)
		return res.sendStatus(401)
	}
	res.json(db.getAll())
})

router.get('/feed', (req: Request, res: Response) => {
	if (!req.query.key || req.query.key != config.api_key) {
		console.warn(`Unauthorized feed read attempt from ${req.ip} !`)
		return res.sendStatus(401)
	}

	let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">

<channel>
	<title>${config.feed_title}</title>
	<description>${config.feed_desc}</description>
	<generator>readerss</generator>
	<language>en</language>
	<pubDate>${new Date(db.get(-1).added).toUTCString()}</pubDate>
`

	for (var entry of db.getAll()) {
		rss += `
	<item>
		<title>${entry.title}</title>
		<link>${entry.url}</link>
		<guid>${entry.id}</guid>
		<pubDate>${entry.added}</pubDate>
		<description><![CDATA[${entry.description}]]></description>
		<content:encoded><![CDATA[${entry.content}]]></content:encoded>
	</item>
`
	}

	rss += `
</channel>
</rss>
`
	res.send(rss)
})

export default router
