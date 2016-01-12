# WordPress Hybrid Client

![screenshots](http://julienrenaux.fr/wp-content/uploads/2015/07/devices.jpg)

## Chat

[![Join the chat at https://gitter.im/livingobjects/angular-memory-stats](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/shprink/wordpress-hybrid-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Features

- [X] Posts
- [X] Pages
- [X] Custom posts
- [X] Taxonomies (Category, Tag and custom)
- [X] Authors
- [X] Search
- [X] Push Notifications
- [X] Custom templates (overwrite any template of the app)
- [X] Social sharing
- [X] Sass variables
- [X] Parameters Page
      - Language switch [English|French|Chinese|Spanish|Polish|German]
      - Accessibility (Post font size)
- [X] Image cache on device
- [X] App rate plugin
- [X] Syntax highlighter
- [X] Offline (Bookmarks)
- [X] Comments (Submitting is not supported yet)
- [X] iOS9 support

## Built with WPHC

* Android
  * https://play.google.com/store/apps/details?id=com.shprinkinc.wordpresshybridclient
  * http://hiwaldorf.com/app/
  * https://play.google.com/store/apps/details?id=fr.silentkernel.app
  * https://play.google.com/store/apps/details?id=com.notmyfault
* IOS
  * https://itunes.apple.com/cn/app/id1030393337

## Quick Start

### Preriquisites

- Git
- NodeJS (recommended: 4.x), please do not use npm 5.x for now
- NPM (recommended: 3.3.x)

```
# Clone and use the latest version
$ git clone https://github.com/shprink/wordpress-hybrid-client.git && cd wordpress-hybrid-client
# List all versions
$ git tag
$ git checkout <the-latest-version>

# Install
$ npm install && npm run installWPHC

# Run on the browser
$ npm run devserver
```

Open http://localhost:8080/webpack-dev-server/ in Chrome (the only browser supported). You should see the application running with `http://dev.julienrenaux.fr/wp-json` backend.

To go further please read the documentations.

## Documentations

### Installation

Read the manual: [INSTALLATION.md](INSTALLATION.md)

### Configuration

Read the manual: [CONFIGURATION.md](CONFIGURATION.md)

### Development

Read the manual: [DEVELOPMENT.md](DEVELOPMENT.md)

### Push Notifications

Read the manual: [PUSHNOTIFICATIONS.md](PUSHNOTIFICATIONS.md)

### Build Android & iOS

Read the manual: [BUILD.md](BUILD.md)

### Release Android & iOS

Read the manual: [RELEASE.md](RELEASE.md)

### Splashscreens and Icons

Read the manual: [SPLASHICONS.md](SPLASHICONS.md)

## Project public API

```
# Dev server
npm run devserver

# Dump files in www
npm run dumpdev
npm run dumpprod

# Run Cordova
npm run android
npm run ios
npm run iosEmulator

# Cordova build
npm run buildAndroid
npm run buildProdAndroid
npm run buildIOS
npm run buildProdIOS
```

## Support

[![Flattr WPHC](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=shprink&url=https%3A%2F%2Fgithub.com%2Fshprink%2Fwordpress-hybrid-client)

## Contribute

WordPress hybrid Client is Open Source, If you are interested in helping, please read the following:

### Pull Request Guidelines

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, do not bundle more than one "feature" or bug fix per PR. Doing so makes it very hard to accept it if one of the fixes has issues.

It's always best to create two smaller PRs than one big one.

### Style

Always use four spaces, no tabs. This goes for any HTML, CSS, or Javascript.
