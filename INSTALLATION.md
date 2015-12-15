## Installation

This installation works on both OSX and Linux. Windows is not supported yet, if you want to help with that let us know: <https://github.com/shprink/wordpress-hybrid-client/issues/39>

### Preriquisites

* NodeJS (recommended: 4.x), please do not use npm 5.x for now
* NPM (recommended: 3.3.x `sudo npm install -g npm`)
* Ionic CLI `sudo npm install -g ionic`

If you are running linux you might need to install all of the following dependencies: <https://github.com/shprink/wphc-dockerbox/blob/master/Dockerfile#L13-L14>

### Clone repository

```
$ git clone https://github.com/shprink/wordpress-hybrid-client.git

# Open the project folder
$ cd wordpress-hybrid-client

# List all tags
$ git tag
v2.0.0
etc.

# checkout the latest version available
$ git checkout <the-latest-version>
```

### Install dependencies

The installation will not install anything globally to avoid potential version conflicts.

```
# install dependencies
npm install
```

This could takes several minutes.

During the installation you might have the following error on OSX:

* `ld: library not found for -lgcc_s.10.5`: Installing XCode 7 will solve the problem

### Config files

```
# Copy local config
npm run installWPHC
```

Your personal config files live now in the `config` folder. You can modify all of them except `config.default.cson` which contains the default config that can be overwritten using `config.dev.cson` and `config.prod.cson`

### Installing the Web service

Install this plugin <https://wordpress.org/plugins/rest-api/> (v2.x) to your WordPress website then add the address to the `config.dev.cson` and `config.prod.cson` files:

```
"api":
    "baseUrl": "http://YourDomain/wp-json"
```

Now your Webservice is ready to be queried.
