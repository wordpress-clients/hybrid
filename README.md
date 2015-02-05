## install

```
npm install -g cordova ionic webpack webpack-dev-server
ionic start wordpress-hybrid-client sidemenu
cordova platform add ios
cordova platform add android
cp config.json.dist config.json
```

## Run
```
# live reload version
webpack-dev-server

# Dump files within the www folder
webpack

# Prod version
gulp

# Ios/Android overview
ionic serve --lab
```

## Contribute

```
npm install
webpack-dev-server
```
