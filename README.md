## installation

<INSTALLATION.md>

## Run
```
# live reload version (http://localhost:9100/)
npm run-script devserver

# Dump dev files within the www folder
npm run-script dumpdev

# Dump Prod files within the www folder
npm run-script dumpprod

# Run on device (make sure your device is listed: ```$ adb devices```)
ionic run android
```

## Release Android & iOS

<RELEASE.md>

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
- [ ] Image cache ngImgCache
- [ ] Personnalized Logo
- [ ] Comment system (FB, WP, Disqus)
- [ ] Templating
- [ ] Contact form
- [ ] Push Notifications
- [ ] Offline
- [ ] Ability to add ads
- [ ] App rate
