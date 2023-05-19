## to do
- [ ] tag container image
- [ ] add atom XML endpoint
- [ ] actually validate the config
- [ ] clean up the articles before saving them (remove unnecessary elements, params, etc.)
- [ ] improve the bookmarklet (stay on the page, show a notification/modal with the server response)
- [ ] generate an API key and log it on first start
- [ ] add a simple landing page on `/` (viewable only with authentication)
  - [ ] setup instructions
  - [ ] bookmarklet drag-and-drop
  - [ ] API key reroll
- [ ] get a logo (https://en.wikipedia.org/wiki/Reticule_(handbag)#/media/File:Reticule.tif ?)

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
