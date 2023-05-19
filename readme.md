# reticule

basic express server for saving online articles to read later.


## Installation

### Docker

```sh
docker run -d \
  -p 3000:80 \
  -e API_KEY=e44dd04a559c71f0 \
  -v ./reticule:/data \
  git.cyberia.club/reese/reticule:latest
```

### Docker Compose

```yaml
version: '3'

services:
  reticule:
    image: git.cyberia.club/reese/reticule:latest
    restart: unless-stopped
    ports:
      - 3000:80
    volumes:
      - ./reticule:/data
    environment:
      - API_KEY=5184424c7804a089  # generate a strong secret with `openssl rand -hex 32`
      
      # these variables are optional, and the defaults are provided for reference.
      - PORT=80
      - DB_FILE=/data/db.json
      - FEED_TITLE=Reading list
      - FEED_DESCRIPTION=Articles saved to be read later
      - PUBLIC=false
```

### Environment variables

| variable         | description                                                       |
|:-----------------|:------------------------------------------------------------------|
| API_KEY          | The password needed to be able to use the API (required).         |
| PORT             | The port within the container that the server runs on.            |
| DB_FILE          | The path and filename of the database file within the container.  |
| FEED_TITLE       | The name of your reading list feed that shows up in feed readers. |
| FEED_DESCRIPTION | A short description to accompany the above.                       |
| PUBLIC           | Allow reading your article feed without an API key                |


## Usage

### Web browser
1. Copy the bookmarklet code from the logs and replace `<SERVER_ADDRESS>` with the IP address or domain name.
2. Create a new bookmark in your browser (in the bookmarks bar for easy access, perhaps) and set the URL to the bookmarklet code.
3. Go to an article that you want to save, click the bookmark, et voila!

### Android
1. Install HTTP Shortcuts from [F-Droid](https://f-droid.org/en/packages/ch.rmy.android.http_shortcuts/) or the [Play Store](https://play.google.com/store/apps/details?id=ch.rmy.android.http_shortcuts).
2. Download [`reticule_http_shortcut.json`](extra/reticule_http_shortcut.json) from this repo to your device.
3. Open HTTP Shortcuts, tap the vertical 3 dots in the top right corner, tap "Import/Export", then tap "Import from file". Select the json file you downloaded earlier.
4. Go back to the main page, tap the 3 dot button again, then tap "Variables", and edit the values of `reticule_instance` and `reticule_api_key` to match those of your instance.
5. Try using the share button in an app. A new item "Send to..." with the HTTP Shortcuts icon should appear on the share sheet. You can also save an article by tapping the shortcut inside the HTTP Shortcuts app itself and pasting the URL.

### RSS feed reader
The RSS feed URL is `<SERVER_ADDRESS>/feed?key=<API_KEY>`. Replace the placeholders with your proper values and add it to your feed reader of choice. If it doesn't work in your reader, open an issue and I will try my best to resolve it!


## Fine print
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org/
