## install

```
npm install -g cordova ionic webpack webpack-dev-server
ionic start wordpress-hybrid-client sidemenu
cordova platform add ios
cordova platform add android
cp config.json.dist config.json
# for prod build
cp config.json.dist config.prod.json
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
ionic build android --release
```

## Publish

http://developer.android.com/tools/publishing/app-signing.html#cert

## Contribute

```
npm install
webpack-dev-server
```

### ToDo

- [X] Attempt to connect with retry button
- [ ] Comment system
- [ ] Sass variable injection from json
- [ ] Templating
- [ ] Social buttons
