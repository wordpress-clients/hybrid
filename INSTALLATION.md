You have the choice to install WPHC directly on your machine (node, npm, bower are required) or you can install WPHC via bower with no other preriquisites than Docker itself.

## Local Installation

### Preriquisites

* NodeJS
* NPM
* Bower

### Clone repository

```
git clone git@github.com:shprink/wordpress-hybrid-client.git
```

### Run install.sh

The installation will not install anything globally to avoid potential version conflicts.

```
sh ./install.sh
```

## Docker Installation

### Preriquisites

* Docker

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

### Pull images

```
Docker pull shprink/wphc
```

### Run

```
docker run -it -v /local/path/to/wordpress-hybrid-client:/wphc shprink/wphc bash
```

Now you should be inside you docker, try listing folders to make sure they are accessible:

```
root@c5d7db4eaf05:/wphc$ ls -la
```

You should see the WPHC files listed. If not and using boot2docker please read this <https://gist.github.com/codeinthehole/7ea69f8a21c67cc07293>

You are now ready to install WPHC:

```
root@c5d7db4eaf05:/wphc$ sh ./install.sh
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
