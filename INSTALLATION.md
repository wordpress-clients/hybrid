## Local Installation

### Preriquisites

* NodeJS
* NPM

### Clone repository

```
$ git clone https://github.com/shprink/wordpress-hybrid-client.git

# Open the project folder
$ cd wordpress-hybrid-client

# List all tags
$ git tag
v1.0.0
v1.1.0
v1.2.0
v1.3.0
v1.3.1
v1.4.0

# checkout the latest version available
$ git checkout v1.4.0
```

### Run install.sh

The installation will not install anything globally to avoid potential version conflicts.

```
sh ./install.sh
```

### Config files

There are two config files, ```config.json``` for the application configuration and ```config.scss``` for the style configuration.

### Installing the Web service

Install this plugin <https://wordpress.org/plugins/json-rest-api/> to your WordPress website then add the address to the ```config.json``` file:

```
"api": {
    "baseUrl": "http://YourDomain/wp-json"
},
```

Now your Webservice is ready to be queried.
