You have the choice to install WPHC directly on your machine (node, and npm are required) or you can experiment installation of WPHC via bower with no other preriquisites than Docker itself.

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

# checkout the latest version available
$ git checkout v1.3.1
```

### Run install.sh

The installation will not install anything globally to avoid potential version conflicts.

```
sh ./install.sh
```

## Docker Installation

### Preriquisites

* Docker

BEWARE: Installing with Docker is experimental. There is still a problem on mapping users in and out the container. If you happen to have experience with Docker and you want to help please let me know. Until then you are on your own with Docker ;)

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

### Pull images

```
sudo docker pull shprink/wphc
```

### Run

```
sudo docker run -it -v /local/path/to/wordpress-hybrid-client:/wphc shprink/wphc bash
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
