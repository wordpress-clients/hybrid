## Installation

This installation works on both OSX and Linux. Windows is not supported yet, if you want to help with that let us know: <https://github.com/shprink/wordpress-hybrid-client/issues/39>

If you have problems with the installation, this tutorial <http://www.sitepoint.com/wordpress-hybrid-client-wordpress-powered-ios-android-apps/> might help.

### Preriquisites

* NodeJS (recommended: 4.1.x)
* NPM (recommended: 3.3.x `sudo npm install -g npm`)

### Clone repository

```
$ git clone https://github.com/shprink/wordpress-hybrid-client.git

# Open the project folder
$ cd wordpress-hybrid-client

# List all tags
$ git tag
v1.3.0
v1.3.1
v1.4.0
v1.5.2
v1.6.0
etc.

# checkout the latest version available
$ git checkout <the-latest-version>
```

### Run install.sh

The installation will not install anything globally to avoid potential version conflicts.

```
npm run installWPHC
```

During the installation you might have the following error on OSX:

* `ld: library not found for -lgcc_s.10.5`: Installing XCode 7 might solve the problem

### Config files

There are two config files, ```config.json``` for the application configuration and ```config.scss``` for the style configuration.

### Installing the Web service

Install this plugin <https://wordpress.org/plugins/json-rest-api/> (only version 1.2.x) to your WordPress website then add the address to the ```config.json``` file:

```
"api": {
    "baseUrl": "http://YourDomain/wp-json"
},
```

Now your Webservice is ready to be queried.
