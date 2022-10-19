# readerss

basic express server for saving online articles to read later.

### To do

- [x] basic API
  - [x] add an article
  - [x] RSS endpoint so you can sync it with your feed aggregator of choice
  - [ ] deduplicate articles
  - [ ] delete an article?
- [x] get configuration from environment variables
- [x] add a database (stored as JSON but i would like to use sqlite3. i just have no idea what i'm doing.)
- [x] add docker support
- [x] make a browser bookmarklet for quickly saving articles
- [x] log some useful info on startup, like the bookmarklet code
- [x] improve usage instructions (add from browser, add from phone with HTTP Shortcuts, etc)
- [ ] sanitize articles before saving them
- [ ] find a slightly better name

### Will not do

- make a frontend. i'm keeping it simple, why not fork it and add one yourself? 😉

## Setup

### Docker

```sh
docker run -d \
  -p 3000:80 \
  -e API_KEY=e44dd04a559c71f0 \
  -v ./readerdata:/data \
  reeseovine/readerss:latest
```

### Docker Compose

```yaml
version: '3.8'
services:
  readerss:
    image: reeseovine/readerss:latest
    restart: unless-stopped
    ports:
      - 3000:80
    volumes:
      - ./readerdata:/data
    environment:
      - API_KEY=5184424c7804a089  # generate a strong secret with `openssl rand -hex 32`
      
      # these variables are optional, and the defaults are provided for reference.
      - PORT=80
      - DB_FILE=/data/db.json
      - FEED_TITLE=Reading list
      - FEED_DESCRIPTION=Articles saved to be read later
```

### Environment variables

| variable         | description                                                       |
|:-----------------|:------------------------------------------------------------------|
| API_KEY          | The password needed to be able to use the API.                    |
| PORT             | The port within the container that the server runs on.            |
| DB_FILE          | The path and filename of the database file within the container.  |
| FEED_TITLE       | The name of your reading list feed that shows up in feed readers. |
| FEED_DESCRIPTION | A short description to accompany the above.                       |

## Usage

### Web browser
1. Copy the bookmarklet code from the logs and replace `<SERVER_ADDRESS>` with the IP address or domain name.
2. Create a new bookmark in your browser (in the bookmarks bar for easy access, perhaps) and set the URL to the bookmarklet code.
3. Go to an article that you want to save, click the bookmark, et voila!

### Android
1. Install HTTP Shortcuts from [F-Droid](https://f-droid.org/en/packages/ch.rmy.android.http_shortcuts/) or the [Play Store](https://play.google.com/store/apps/details?id=ch.rmy.android.http_shortcuts).
2. Download [`readerss_http_shortcut.json`](extra/readerss_http_shortcut.json) from this repo to your device.
3. Open HTTP Shortcuts, tap the vertical 3 dots in the top right corner, tap "Import/Export", then tap "Import from file". Select the json file you downloaded earlier.
4. Go back to the main page, tap the 3 dot button again, then tap "Variables", and edit the values of `readerss_instance` and `readerss_api_key` to match those of your instance.
5. Try using the share button on an app. A new item "Send to..." should appear on the share sheet. You can also save an article by tapping the shortcut inside the HTTP Shortcuts app itself.

### RSS feed reader
The RSS feed URL is `<SERVER_ADDRESS>/feed?key=<API_KEY>`. Replace the placeholders with your proper values and add it to your feed reader of choice. If it doesn't work in your reader, open an issue and I will try my best to fix it!
