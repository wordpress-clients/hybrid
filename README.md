# WordPress Hybrid Client

![screenshots](http://julienrenaux.fr/wp-content/uploads/2015/07/devices.jpg)

## Chat

[![Join the chat at https://gitter.im/livingobjects/angular-memory-stats](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/shprink/wordpress-hybrid-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Built with WPHC

* Android
  * https://play.google.com/store/apps/details?id=com.shprinkinc.wordpresshybridclient
  * http://hiwaldorf.com/app/
  * https://play.google.com/store/apps/details?id=fr.silentkernel.app
* IOS
  * https://itunes.apple.com/cn/app/id1030393337

## Installation

Read the manual: [INSTALLATION.md](INSTALLATION.md)

## Configuration

Read the manual: [CONFIGURATION.md](CONFIGURATION.md)

## Development

Read the manual: [DEVELOPMENT.md](DEVELOPMENT.md)

## Push Notifications

Read the manual: [PUSHNOTIFICATIONS.md](PUSHNOTIFICATIONS.md)

## Build Android & iOS

Read the manual: [BUILD.md](BUILD.md)

## Release Android & iOS

Read the manual: [RELEASE.md](RELEASE.md)

## Splashscreens and Icons

Read the manual: [SPLASHICONS.md](SPLASHICONS.md)

## Project public API

```
# Install dependencies
npm run installWPHC

# Dev server
npm run devserver

# Dump files in www
npm run dumpdev
npm run dumpprod

# Run Cordova
npm run runAndroid
npm run runIosEmulator
npm run runIosDevice

# Cordova build
npm run buildAndroid
npm run buildProdAndroid
npm run buildIOS
npm run buildProdIOS
npm run buildAll
npm run buildProdAll

# Cordova Platform
npm run platformAddAndroid
npm run platformAddIOS
npm run platformAddAll

# Cordova Plugin
npm run pluginAddAll
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

### ToDo

- [X] Attempt to connect with retry button
- [X] Social buttons
- [X] Overwrite Sass variables
- [X] About Page
- [X] Params Page
- [X] Language switch [English|French|Chinese]
- [X] Accessibility (Post font size)
- [X] Image cache ngImgCache
- [X] App rate
- [X] Syntax highlighter for tech blogs
- [X] Push Notifications
- [X] Offline
- [X] Comments. Submitting is not supported yet.
- [ ] Table of content for posts
- [ ] Personnalized Logo
- [ ] Templating
- [ ] Contact form
- [ ] Ability to add ads
