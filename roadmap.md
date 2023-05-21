## to do
- [ ] add atom XML endpoint
- [ ] clean up the articles before saving them (remove unnecessary elements, params, etc.)
- [ ] improve the bookmarklet (stay on the page, show a notification/modal with the server response)
- [ ] store API key hashed in the DB (which makes it only possible to use API_KEY=abc123 on first run)
- [ ] generate an API key and log it on first start (if one isn't provided or already in the DB)
- [ ] switch to using JWT?
- [ ] add a simple landing page on `/` (viewable only with authentication)
  - [ ] setup instructions
  - [ ] bookmarklet drag-and-drop
  - [ ] API key reroll
- [ ] get a logo (https://en.wikipedia.org/wiki/Reticule_(handbag)#/media/File:Reticule.tif ?)

## v1.1
- [x] tag container image
- [x] actually validate the config
- [x] include the version number (+ any changes) in the API

## v1.0
- [x] change name to [**reticule**](https://en.wikipedia.org/wiki/Reticule_(handbag))
- [x] change license
- [x] move away from github
  - [x] create woodpecker build pipeline
  - [x] host container image on forgejo
  - [x] host container image on docker hub
  - [x] point old docker hub page to `reeseovine/reticule`

## alpha
- [x] use lowdb
- [x] deduplicate entries by URL
