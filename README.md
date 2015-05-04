## install

```
npm install -g cordova ionic webpack webpack-dev-server

# Dev App config
cp config.json.dist config.json
# Prod App config
cp config.json.dist config.prod.json
# Hybrid config
cp config.xml.dist config.xml
# Release script
cp release.sh.dist release.sh

```

## Run
```
# live reload version
webpack-dev-server

# Dump dev files within the www folder
gulp build

# Dump Prod files within the www folder
gulp build:prod

# Ios/Android overview
ionic serve --lab

# Run on device (make sure your device is listed: ```$ adb devices```)
ionic run android
```

# Generate apps

## Create Apk (android)

### Keyboard adjustement

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"``` it will prevent losing the menu to close when searching on tablets.


```
# Make sure your change the path to your signing key. Change ```~/.ssh/android_wphc.keystore``` to whatever your Android key is.
sh ./release.sh
```

## Contribute

WordPress hybrid Client is Open Source, If you are interested in helping, please read the following:

### Pull Request Guidelines

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, do not bundle more than one "feature" or bug fix per PR. Doing so makes it very hard to accept it if one of the fixes has issues.

It's always best to create two smaller PRs than one big one.

### Style

Always use four spaces, no tabs. This goes for any HTML, CSS, or Javascript.

### ToDo

- [X] Attempt to connect with retry button
- [ ] Comment system
- [ ] Sass variable injection from json (or parsing CSS to replace variable on the fly)
- [ ] Templating
- [ ] Social buttons
- [ ] Contact form
