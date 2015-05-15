## Installation

NB: The following installation was made for OSX and Linux (Debian/Ubuntu). There is no Windows support.

### Preriquisites

* NodeJS
* NPM

### Clone repository

```
git clone git@github.com:shprink/wordpress-hybrid-client.git
```

### Run install.sh

```
sh ./install.sh
```

### Config files

Now that the installation is done two files

There are two config files, ```config.json``` for the application configuration and ```config.scss``` for the style configuration.

### Installing the Web service

Install this plugin <https://wordpress.org/plugins/json-rest-api/> to your WordPress website then add the address to the ```config.json``` file:

```
"api": {
    "baseUrl": "http://YourDomain/wp-json"
},
```

Now your Webservice is ready to be queried.
