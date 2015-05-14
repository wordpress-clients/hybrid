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
# Sass overwrite
cp sass_overwrite.scss.dist sass_overwrite.scss
# About page
cp about.md.dist about.md

```

## Config

There are two config files, ```config.json``` and ```sass_overwrite.scss```

### Installing the Web service

Install this plugin <https://wordpress.org/plugins/json-rest-api/> to your WordPress website then add the address to the ```config.json``` file:

```
"api": {
    "baseUrl": "http://YourDomain/wp-json"
},
```

Now your Webservice is ready to be queried.
