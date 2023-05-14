import { app } from './app.js'
import config from './config.js'

app().listen(config.port, () => {
	console.info(`Listening on port ${config.port}`)

	console.info(
		`Here is the bookmarklet code. Make sure you replace <SERVER_ADDRESS> with this server's ip or hostname (including the protocol and port) that your browser can access!`
	)
	let bookmarklet = `(()=>{window.open("<SERVER_ADDRESS>/add?key=${config.api_key}&url="+encodeURIComponent(location),"_blank","noreferrer,noopener")})()`
	console.info(`\n    javascript:${bookmarklet}\n`)

	console.info(
		`Then add <SERVER_ADDRESS>/feed?key=${config.api_key} to your RSS feed reader of choice.\n`
	)
})
