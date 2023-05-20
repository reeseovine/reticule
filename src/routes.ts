import { Express, Router, Request, Response } from 'express'
import { extract, ArticleData } from '@extractus/article-extractor'

import config from './config.js'
import db from './database.js'
import noCache from './middleware/no-cache.js'
import cacheForever from './middleware/cache-forever.js'
import { Article } from './types.js'
import pkgver from './version.js'

const router = Router()

router.get('/favicon.ico', cacheForever(), (_: Request, res: Response) => res.sendStatus(204))

router.get('/robots.txt', cacheForever(), (_: Request, res: Response) => {
	res.type('text/plain')
	res.send('User-agent: *\nDisallow: /')
})

router.get('/healthcheck', noCache(), (_: Request, res: Response) => {
	res.json({ timestamp: Date.now(), version: pkgver })
})

router.get('/add', noCache(), (req: Request, res: Response) => {
	if (!req.query.key || req.query.key != config.api_key) {
		return res.sendStatus(401)
	}

	if (!req.query.url) {
		console.error('No URL given. Skipping...')
		return res.sendStatus(400)
	}
	let url = decodeURIComponent(req.query.url as string)
	for (let entry of db.data.articles) {
		if (entry.url == url) {
			return res.status(200).send(`Skipping duplicate.`)
		}
	}

	console.info(`Adding ${req.query.url}`)
	extract(url)
		.then(async (article) => {
			article = article as Article
			db.data.articles.push(
				Object.assign(article, {
					added: new Date(),
					id: Date.now(),
				})
			)
			db.data.articles.sort((a: Article, b: Article) => {
				return new Date(b.added).getTime() - new Date(a.added).getTime()
			})
			await db.write()
			return res.status(201).send(`Successfully saved "${article.title}"!`)
		})
		.catch((err) => {
			console.trace(err)
			return res.sendStatus(500)
		})
})

router.get('/json', (req: Request, res: Response) => {
	if (!config.public && (!req.query.key || req.query.key != config.api_key)) {
		console.warn(`Unauthorized /json read attempt from ${req.ip} !`)
		return res.sendStatus(401)
	}
	res.json(db.data.articles)
})

router.get('/feed', (req: Request, res: Response) => {
	if (!config.public && (!req.query.key || req.query.key != config.api_key)) {
		console.warn(`Unauthorized /feed read attempt from ${req.ip} !`)
		return res.sendStatus(401)
	}

	let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">

<channel>
	<title>${config.feed_title}</title>
	<description>${config.feed_desc}</description>
	<generator>Reticule ${pkgver}</generator>
	<language>en</language>
	<pubDate>${
		db.data.articles.length > 0 ? new Date(db.data.articles[1].added).toUTCString() : ''
	}</pubDate>
`

	for (var entry of db.data.articles) {
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
